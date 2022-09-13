import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from '../../constants/internalConstants';
import { urlRequestToday, urlRequestTomorrow, urlRequestThreeDays } from '../../constants/requestConstants';
import { serverResponseObj } from '../../example';
import { getData, getWeatherState } from '../../functions/getData';

//Добавь useSelect export const selectTodos = (state) => state.todos.todos;
export const selectWeather = (state) => ( state.weather);

// const response = getData(urlRequest);

// const initialState = getInitialState(response);

// const {weather} = store.getState();
// console.log(weather);

export const loadedWeather = createAsyncThunk('weather/loadedWeather', async (url, { rejectWithValue }) => {
    try {
        const weatherData = getData(url);
        return weatherData;
    }
    catch (err) { return rejectWithValue(err) }
})

const initialState = {
    dateToShowWeather: DATE_TO_SHOW_WEATHER.TODAY,
    // weather: '',
    // status: REQUEST_STATUS.PENDING,
    // error: null,
    // startTime: moment(),
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        dataRefreshed(state, action) {
            state.status = 'jopa';
        },
        setedStartTime(state, action) {
            state.startTime = action.payload;
        },
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
    extraReducers: (builder) => {
        builder
            .addCase(loadedWeather.pending, (state, action) => {
                state.status = REQUEST_STATUS.PENDING;
            })
            .addCase(loadedWeather.fulfilled, (state, action) => {
                state.status = REQUEST_STATUS.FULFILLED;
                const {startTime,todayWeather,tomorrowWeather,threeDaysWeather,status,error} = getWeatherState(action.payload);
                // state = getWeatherState(action.payload);
                // debugger
                state.startTime = startTime;
                state.todayWeather = todayWeather;
                state.tomorrowWeather = tomorrowWeather;
                state.threeDaysWeather = threeDaysWeather;
                state.status = status;
                state.error = error;
            })
            .addCase(loadedWeather.rejected, (state, action) => {
                state.error = action.error;
                state.status = REQUEST_STATUS.ERROR;
            })
    }
})

export const { dataRefreshed, setedStartTime, clickedThreeDays, clickedToday, clickedTomorrow } = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;

