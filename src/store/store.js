import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./request/weatherSlice";

const store = configureStore({
    reducer: {
        weather: weatherReducer,
    }
});

export default store;
export const { weather: weatherState } = store.getState();