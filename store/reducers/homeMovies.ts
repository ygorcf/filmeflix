import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootStoreState } from ".";
import api from "../../services/api";

export interface Genre {
    id: number;
    name: string;
}

export interface MovieResponse {
    title: string;
    genre_ids: number[];
    id: number;
    poster_path: string;
}

export interface HomeMoviesState {
    page: number;
    results: (Genre & { movies: MovieResponse[] })[],
    loading: boolean
}

export const homeMoviesSlice = createSlice({
    name: 'homeMovies',
    initialState: {
        page: 0,
        results: [],
        loading: false
    } as HomeMoviesState,
    reducers: {
        loadMovies: (state, action) => {
            state.loading = true
            state.page = action.payload || state.page
        },
        loadedMovies: (state, action) => {
            state.loading = false
            state.results = action.payload
        }
    }
})

export const { loadedMovies } = homeMoviesSlice.actions

export function loadMovies() {
    return async function(dispatch, getState) {
        const genresResponse = await api.get('/genre/movie/list')
        const { genres } = genresResponse.data as { genres: { id: number, name: string }[] }
        const discoverResponse = await api.get('/discover/movie')

        const moviesByGenre = (
            discoverResponse.data.results as MovieResponse[]
        ).reduce((genres, movie) => {
            genres.forEach(g => {
                if (movie.genre_ids.includes(g.id)) {
                    g.movies.push(movie)
                }
            })

            return genres
        }, genres.map(g => ({ ...g, movies: [] as MovieResponse[] })))

        dispatch(loadedMovies(moviesByGenre.filter(g => g.movies.length > 0)))
    } as ThunkAction<void, RootStoreState, unknown, AnyAction>
}

export default homeMoviesSlice.reducer
