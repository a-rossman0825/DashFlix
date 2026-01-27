# Api Endpoints

## MOVIES:

#### Browse/Discover:

- /movie/popular
- /movie/top_rated
- /movie/now_playing
- /movie/upcoming
- /trending/movie/day \- Trending today
- /trending/movie/week \- Trending this week

---

#### Discovery & Search:

- /discover/movie \-filtered by genre, year, rating, etc.
- /search/movie?query=searchTerm \-search by title
- /genre/movie/list \- Get all movie genre IDs

---

#### Details (when user clicks a movie):

- /movie/{movie_id}
- /movie/{movie_id}/videos \- Trailers
- /movie/{movie_id}/credits \- Cast & crew
- /movie/{movie_id}/similar \- Similar movies
- /movie/{movie_id}/recommendations \- Recommended movies

---

## TV SHOWS:

#### Browse/Discover:

- /tv/popular \- Popular TV shows
- /tv/top_rated \- Top rated shows
- /tv/on_the_air \- Currently airing
- /tv/airing_today \- Airing today
- /trending/tv/day \- Trending today
- /trending/tv/week \- Trending this week

---

#### Discovery & Search:

- /discover/tv \- Filter by genre, network, etc.
- /search/tv?query=searchTerm \- Search by title
- /genre/tv/list \- Get all TV genre IDs

---

#### Details (when user clicks a show):

- /tv/{tv_id} \- Basic show details
- /tv/{tv_id}/videos \- Trailers
- /tv/{tv_id}/credits \- Cast & crew
- /tv/{tv_id}/similar \- Similar shows
- /tv/{tv_id}/recommendations \- Recommended shows
- /tv/{tv_id}/season/{season_number} \- Season details
- /tv/{tv_id}/season/{season_number}/episode/{episode_number} \- Episode details

---