<script lang="ts" setup>
import type { Movie } from '@/models/Movie';
import HomeCard from './HomeCard.vue';


defineProps<{
    title: string;
    movies: Movie[];
}>();

</script>

<template>
  <div class="carousel-wrapper">
    <div class="section-title">
        {{ title }}
    </div>
    <div class="carousel-container d-flex pt-3 pb-3">
        <HomeCard
            v-for="movie in movies" :key="`carousel-wrapper-movie-id-${movie.id}`" :movie="movie"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .carousel-container {
        gap: 10px;
        overflow-x: auto;
        scroll-behavior: smooth;
        height: 350px;
    }
</style>