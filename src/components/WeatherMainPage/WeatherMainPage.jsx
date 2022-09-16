import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from "../../constants/internalConstants";
import { urlRequestThreeDays, urlRequestToday, urlRequestTomorrow } from "../../constants/requestConstants";
import { getData, getURL } from "../../functions/getData";
import { useAxios } from "../../hooks/useAxios";
import { clickedThreeDays, clickedToday, clickedTomorrow, loadedWeather, selectWeather } from "../../store/dateSlice/weatherSlice";
import { changedTimer, selectRefresh, startedTimer, timerCanceled } from "../../store/refreshSlice/refreshSlice";
import { weatherState } from "../../store/store";
import { Weather } from "../Weather/Weather";

export const WeatherMainPage = (props) => {

    const dispatch = useDispatch();

    const { dateToShowWeather } = useSelector(selectWeather);

    const { refreshFlagForTimer, refreshFlagForUseEffect } = useSelector(selectRefresh)

    useEffect(() => {
        dispatch(startedTimer());
        return () => {
            dispatch(timerCanceled());
        }
    }, [refreshFlagForTimer])

    const { state, setState } = useAxios({
        data: null,
        status: REQUEST_STATUS.PENDING,
        error: null,
    }, getURL(dateToShowWeather), [dateToShowWeather, refreshFlagForUseEffect])

    const handleTodayClick = () => { dispatch(clickedToday()); }

    const handleTomorrowClick = () => { dispatch(clickedTomorrow()) };

    const handleThreeDaysClick = () => { dispatch(clickedThreeDays()) };
    ////////////////////////////////////////////////////////////////
    const handleCancelTimer = () => { dispatch(timerCanceled()) };
    const handlestartTimer = () => { dispatch(changedTimer()) };
    /////////////////////////////////////////////////////////
    return (
        <>
            <p>Главная часть, тут приветствие и погода</p>
            <button onClick={handleTodayClick}>Погода сегодня</button>
            <button onClick={handleTomorrowClick}>Погода завтра</button>
            <button onClick={handleThreeDaysClick}>Погода на три дня</button>
            <button onClick={handleCancelTimer}>отменить тайсмер</button>
            <button onClick={handlestartTimer}>вкключить тайсмер</button>
            <Weather>
                {JSON.stringify(state.data)}
            </Weather>
        </>
    )
}