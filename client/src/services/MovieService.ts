import type { MovieResponse } from "@/models/Movie";
import { api } from "./AxiosService";

class MovieService {

    async getPopularMovies(): Promise<MovieResponse> {
        const res = await api.get('/movie/popular');
        return res.data;
    }

}

export const movieService = new MovieService();