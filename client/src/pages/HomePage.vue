<script lang="ts" setup>
import { movieService } from '@/services/MovieService';
import { useMovieStore } from '@/Stores/MovieStore';
import { logger } from '@/utils/Logger';
import { onMounted } from 'vue';

const movieStore = useMovieStore(); 

onMounted(() => {
  console.log(movieStore.isLoading)
})

</script>

<template>
  <main class="text-light">
    <div class="container">
      <div v-if="movieStore.isLoading" class="row d-flex text-center align-items-center mt-5 pt-5">
        <h1>Loading...</h1>
        <h1><i class="mdi mdi-skull mdi-spin"></i></h1>
      </div>
      <div v-else>Hello World!</div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
