export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
    adult: boolean;
    original_language: string;
    original_title: string;
    video: boolean;
    media_type?: string; //NOTE - Only appears in /trending endpoints
};

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};