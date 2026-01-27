import type { Movie, MovieResponse } from "@/models/Movie";
import { movieService } from "@/services/MovieService";
import { logger } from "@/utils/Logger";
import { defineStore } from "pinia"


export const useMovieStore = defineStore('movie', {
    state: () => ({
        popularMovies: [] as Movie[],
        

        isLoading: false,
        error: null as string | null,
    }),

    actions: {
        async getPopularMovies() {
            try { 
              this.isLoading = true;
              this.error = null;
              const res: MovieResponse = await movieService.getPopularMovies();
              this.popularMovies = res.results;
            } catch (err: any) {
                this.error = err.message;
                logger.error('Failed to fetch popular movies: ', err);
            } finally {
                this.isLoading = false;
            }
        }
    }
});