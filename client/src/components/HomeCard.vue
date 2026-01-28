<script lang="ts" setup>
import type { Movie } from "@/models/Movie";
import { ref } from "vue";
import { api } from "@/services/AxiosService";

const props = defineProps<{
  movie: Movie;
}>();

const isHovered = ref(false);
const showTrailer = ref(false);
const logoPath = ref<string | null>(null);
const trailerKey = ref<string | null>(null);
let hoverTimer: number | null = null;
let leaveTimer: number | null = null;

async function handleMouseEnter() {
  // Clear any pending leave timer
  if (leaveTimer) {
    clearTimeout(leaveTimer);
    leaveTimer = null;
  }

  isHovered.value = true;

  // Fetch logo if we don't have it yet
  if (!logoPath.value) {
    try {
      const response = await api.get(`/movie/${props.movie.id}/images`);
      const logos = response.data.logos;
      if (logos && logos.length > 0) {
        const enLogo = logos.find((l: any) => l.iso_639_1 === "en") || logos[0];
        logoPath.value = enLogo.file_path;
      }
    } catch (error) {
      console.error("Failed to fetch logo:", error);
    }
  }

  hoverTimer = window.setTimeout(() => {
    if (isHovered.value) {
      showTrailer.value = true;
      // Fetch trailer if we don't have it yet
      if (!trailerKey.value) {
        fetchTrailer();
      }
    }
  }, 2000);
}

async function fetchTrailer() {
  try {
    const response = await api.get(`/movie/${props.movie.id}/videos`);
    const videos = response.data.results;
    if (videos && videos.length > 0) {
      // Find official trailer or teaser
      const trailer =
        videos.find(
          (v: any) =>
            v.type === "Trailer" && v.site === "YouTube" && v.official,
        ) ||
        videos.find((v: any) => v.type === "Trailer" && v.site === "YouTube") ||
        videos[0];

      if (trailer && trailer.site === "YouTube") {
        trailerKey.value = trailer.key;
      }
    }
  } catch (error) {
    console.error("Failed to fetch trailer:", error);
  }
}

function handleMouseLeave() {
  // Delay closing by 200ms to avoid closing when moving between gaps
  leaveTimer = window.setTimeout(() => {
    isHovered.value = false;
    showTrailer.value = false;
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }, 200);
}
</script>

<template>
  <div
    class="movie-card"
    :class="{ expanded: isHovered }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Poster (crossfade with backdrop) -->
    <img
      :src="`https://image.tmdb.org/t/p/w342${props.movie.poster_path}`"
      :alt="props.movie.title"
      class="poster"
      :class="{ hidden: isHovered }"
    />

    <!-- Backdrop/Trailer background (crossfade with poster) -->
    <div
      class="backdrop-container"
      :class="{ visible: isHovered }"
      :style="{
        backgroundImage: !showTrailer
          ? `url(https://image.tmdb.org/t/p/w780${props.movie.backdrop_path})`
          : 'none',
      }"
    >
      <!-- Trailer placeholder -->
      <div v-show="showTrailer && !trailerKey" class="trailer d-flex-column">
        <p class="h4">Trailer Loading...</p>
        <i class="mdi mdi-skull mdi-spin h4"></i>
      </div>

      <!-- YouTube Trailer -->
      <iframe
        v-if="showTrailer && trailerKey"
        :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&autohide=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`"
        class="trailer-iframe"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>

      <!-- Info panel overlaid on left -->
      <div v-if="isHovered" class="info-panel">
        <img
          v-if="logoPath"
          :src="`https://image.tmdb.org/t/p/w300${logoPath}`"
          :alt="props.movie.title"
          class="movie-logo"
        />
        <h3 v-else>{{ props.movie.title }}</h3>

        <div class="movie-meta">
          <span class="rating"
            >⭐ {{ props.movie.vote_average.toFixed(1) }}</span
          >
        </div>
        <div class="buttons">
          <button class="btn btn-sm btn-light">
            <i class="mdi mdi-play"></i>
          </button>
          <button class="btn btn-sm btn-outline-light">
            <i class="mdi mdi-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movie-card {
  width: 265px;
  height: 365px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.6);
  position: relative;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;

  &:hover {
    z-index: 10;
  }

  &.expanded {
    width: 550px;
  }
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
    transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);

  &.hidden {
    opacity: 0;
    transform: scale(1.02);
  }
}

.backdrop-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);

  &.visible {
    opacity: 1;
  }
}

.trailer {
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.trailer-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.info-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.8) 50%,
    transparent 100%
  );
  width: 60%;
  min-height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  animation: slideUp 0.6s ease 1s backwards;

  h3 {
    font-size: 1.2rem;
    margin: 0 0 8px 0;
    color: white;
    font-weight: 600;
  }

  .movie-meta {
    color: #aaa;
    font-size: 0.9rem;
    margin-bottom: 12px;

    .rating {
      color: #ffd700;
    }
  }

  .buttons {
    display: flex;
    gap: 8px;
  }
}

.movie-logo {
  max-width: 200px;
  max-height: 80px;
  object-fit: contain;
  margin-bottom: 8px;
  filter: drop-shadow(2px 4px 6px black);
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
