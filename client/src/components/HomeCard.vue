<script lang="ts" setup>
import type { Movie } from '@/models/Movie';


const props = defineProps<{
    movie: Movie
}>();

</script>

<template>
    <div class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`" />
    </div>
</template>

<style lang="scss" scoped>

</style>