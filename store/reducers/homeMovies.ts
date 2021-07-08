import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootStoreState } from ".";
import api from "../../services/api";

export interface HomeMoviesState {
    page: number;
    results: {
        title: string;
        id: number;
        poster_path: string;
    }[],
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
            state.page = parseInt(action.payload.page)
            state.results = [...state.results, ...action.payload.results]
        }
    }
})

export const { loadedMovies } = homeMoviesSlice.actions

export function loadMovies() {
    return async function(dispatch, getState) {
        const state = getState().homeMovies
        const discoverResponse = await api.get('/discover/movie', {
            params: {
                page: state.page + 1
            }
        })
        dispatch(loadedMovies(discoverResponse.data))
    } as ThunkAction<void, RootStoreState, unknown, AnyAction>
}

export default homeMoviesSlice.reducer
