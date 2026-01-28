<script lang="ts" setup>
import type { Movie } from '@/models/Movie';
import HomeCard from './HomeCard.vue';
import { nextTick, onMounted, ref } from 'vue';


defineProps<{
    title: string;
    movies: Movie[];
}>();

const carouselPosition = ref<HTMLElement | null>(null);

// if user is hovering over THIS carousel
const isHovering = ref(false);
// if carousel at start position, left btn hidden
const showLeftBtn = ref(false);
// if carousel at end position, right btn hidden.
const showRightBtn = ref(false);

function scrollCarousel(direction: 'left' | 'right') {
    if (!carouselPosition.value) return;

    const cardWidth = 265;
    const gap = 20;
    const scrollAmount = (cardWidth * 4) + (gap * 3);

    carouselPosition.value.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(checkScrollPosition, 300);
}


function handleWheel(event: WheelEvent) {
    if (!carouselPosition.value) return;

    event.preventDefault();

    carouselPosition.value.scrollLeft += event.deltaY * 2.5;

    checkScrollPosition();   
}

function checkScrollPosition() {
    if (!carouselPosition.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselPosition.value;

    //if scrollLeft is <= 5
    showLeftBtn.value = scrollLeft > 5;
    //if scrolled to end
    showRightBtn.value = scrollLeft < (scrollWidth - clientWidth - 5);
}

function handleMouseEnter() {
    isHovering.value = true;
    checkScrollPosition();
}

onMounted(async () => {
    await nextTick();
    checkScrollPosition();
})

</script>

<template>
  <div>
    <div class="section-title">
        {{ title }}
    </div>
    
    <div class="carousel-wrapper"
        @mouseenter="handleMouseEnter"
        @mouseleave="isHovering = false"
    >
        <!-- NOTE - LEFT ARROW BTN -->
        <button class="carousel-btn left" :class="{ visible: isHovering && showLeftBtn }" @click="scrollCarousel('left')">
            <i class="mdi mdi-chevron-left"></i>
        </button>

        <!-- NOTE - Carousel/Cards -->
        <div class="carousel d-flex pb-3" ref="carouselPosition" @wheel="handleWheel" @scroll="checkScrollPosition">
            <HomeCard 
                v-for="movie in movies"
                :key="`carousel-wrapper-movie-id-${movie.id}`"
                :movie
            />
        </div>

        <!-- NOTE - RIGHT ARROW BTN -->
        <button class="carousel-btn right" :class="{ visible: isHovering && showRightBtn }" @click="scrollCarousel('right')">
            <i class="mdi mdi-chevron-right"></i>
        </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

    .section-title {
        margin-left: 55px;
        margin-top: 50px;
        font-size: 1.8rem;
        padding-bottom: 10px;
    }

    .carousel-wrapper {
        position: relative;
    }
    .carousel {
        gap: 20px;
        overflow-x:scroll;
        scroll-behavior: smooth;
        height: 400px;
        padding-left: 50px;
        padding-right: 50px;

        //hides scrollbar
        &::-webkit-scrollbar {
            display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    
    .carousel-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        width: 40px;
        height: 200px;
        cursor: pointer;
        z-index: 15;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s, opacity 0.3s ease;
        opacity: 0;
        pointer-events: none;

        &:hover {
            background: rgba(0,0,0,0.9);
            cursor: pointer;
        }

        &.left {
            left: 0;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }

        &.right {
            right: 0;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &.visible {
            opacity: 1;
            pointer-events: auto;
        }
    }

</style>