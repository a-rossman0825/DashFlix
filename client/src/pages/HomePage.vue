<script lang="ts" setup>
import CarouselWrapper from '@/components/CarouselWrapper.vue';
import HomeCard from '@/components/HomeCard.vue';
import { useMovieStore } from '@/Stores/MovieStore';
import { computed, onMounted } from 'vue';

const movieStore = useMovieStore(); 
const popularMovies = computed(() =>  movieStore.popularMovies );

onMounted(() => {
  movieStore.getPopularMovies();
})

</script>

<template>
  <main class="text-light">
    <!-- STUB - Loading page (needs updated) -->
    <div class="container" v-if="movieStore.isLoading && movieStore.popularMovies.length == 0">
      <div class="row d-flex text-center mt-5 pt-5">
        <h1>Loading...</h1>
        <h1><i class="mdi mdi-skull mdi-spin"></i></h1>
      </div>
    </div>

    <!-- STUB - draw movies -->
    <CarouselWrapper title="Popular Movies" :movies="popularMovies" />
  </main>
</template>

<style lang="scss" scoped>

</style>
