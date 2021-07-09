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
    overview: string;
    original_title: string;
}

export interface HomeMoviesState {
    page: number;
    results: (Genre & { movies: MovieResponse[] })[],
    loading: boolean
}

export const homeMoviesSlice = createSlice({
    name: 'homeMovies',
    initialState: {
        page: 1,
        results: [],
        loading: false
    } as HomeMoviesState,
    reducers: {
        loadMovies: (state, action) => {
            state.loading = true
        },
        loadedMovies: (state, action) => {
            state.loading = false
            state.results = action.payload

            if (state.page < 10) {
                state.page = state.page + 1
            }
        }
    }
})

export const { loadedMovies } = homeMoviesSlice.actions

export function loadMovies(pageToLoad?: number) {
    return async function(dispatch, getState) {
        try {
            const page = pageToLoad ?? getState().homeMovies.page
            let genres: { id: number, name: string, movies: MovieResponse[] }[]

            if (page === 1) {
                const genresResponse = await api.get('/genre/movie/list')
                genres = (
                    genresResponse.data as { genres: { id: number, name: string }[] }
                ).genres.map(g => ({ ...g, movies: [] }))
            } else {
                genres = [...getState().homeMovies.results]
            }

            const discoverResponse = await api.get('/discover/movie', { params: { page } })
    
            const moviesByGenre = (
                discoverResponse.data.results as MovieResponse[]
            ).reduce((genres, movie) => {
                const moviesAddeds = [] as number[]
                return genres.map(g => {
                    if (movie.genre_ids.includes(g.id) && !moviesAddeds.includes(movie.id)) {
                        moviesAddeds.push(movie.id)
                        return {
                            ...g,
                            movies: [...g.movies, movie]
                        }
                    }

                    return { ...g }
                })
            }, genres)
    
            dispatch(loadedMovies(moviesByGenre.filter(g => g.movies.length > 0)))
        } catch (e) {
            console.error(e)
        }
    } as ThunkAction<void, RootStoreState, unknown, AnyAction>
}

export default homeMoviesSlice.reducer
