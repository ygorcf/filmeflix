import { combineReducers } from "@reduxjs/toolkit";
import homeMovies, { HomeMoviesState } from "./homeMovies";

export interface RootStoreState {
    homeMovies: HomeMoviesState
}

export default combineReducers({
    homeMovies
})
