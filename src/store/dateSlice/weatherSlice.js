import { createSlice } from '@reduxjs/toolkit';
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from '../../constants/internalConstants';

export const selectWeather = (state) => (state.weather);

const initialState = {
    dateToShowWeather: DATE_TO_SHOW_WEATHER.TODAY,
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        clickedToday(state, action) {
            state.dateToShowWeather = DATE_TO_SHOW_WEATHER.TODAY;
        },
        clickedTomorrow(state, action) {
            state.dateToShowWeather = DATE_TO_SHOW_WEATHER.TOMORROW;
        },
        clickedThreeDays(state, action) {
            state.dateToShowWeather = DATE_TO_SHOW_WEATHER.THREE_DAYS;
        },
    },
})

export const { clickedThreeDays, clickedToday, clickedTomorrow } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;

