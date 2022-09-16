import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./dateSlice/weatherSlice";
import { refreshReducer } from "./refreshSlice/refreshSlice";

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        refresh: refreshReducer,
    }
});

export default store;
export const { weather: weatherState, refresh: refreshState } = store.getState();