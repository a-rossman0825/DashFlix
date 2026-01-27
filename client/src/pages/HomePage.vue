<script lang="ts" setup>
import { useMovieStore } from '@/Stores/MovieStore';
import { onMounted } from 'vue';

const movieStore = useMovieStore(); 

onMounted(() => {
  movieStore.getPopularMovies();
})

</script>

<template>
  <main>
    <!-- STUB - Loading page (needs updated) -->
    <div class="container" v-if="movieStore.isLoading">
      <div class="row d-flex text-center mt-5 pt-5">
        <h1>Loading...</h1>
        <h1><i class="mdi mdi-skull mdi-spin"></i></h1>
      </div>
    </div>
    <!-- STUB - draw movies -->
     <div class="container"></div>
  </main>
</template>

<style lang="scss" scoped></style>
