import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  REQUEST_STATUS } from "../../constants/internalConstants";
import { getURL } from "../../functions/getData";
import { useAxios } from "../../hooks/useAxios";
import { clickedThreeDays, clickedToday, clickedTomorrow, selectWeather } from "../../store/dateSlice/weatherSlice";
import { changedTimer, selectRefresh, startedTimer, timerCanceled } from "../../store/refreshSlice/refreshSlice";
import { Loader } from "../Loader/Loader";
import { ErrorPage } from "../ErrorPage/ErrorPage";
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

    const handleTodayClick = () => { dispatch(clickedToday()); console.log(state)  }

    const handleTomorrowClick = () => { dispatch(clickedTomorrow()); console.log(state) };

    const handleThreeDaysClick = () => { dispatch(clickedThreeDays()); console.log(state)  };
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

            {state.status === REQUEST_STATUS.PENDING && <Loader />}

            {state.status === REQUEST_STATUS.ERROR && <ErrorPage errorObj={state.error} />}

            {state.status === REQUEST_STATUS.FULFILLED && <Weather data={state.data} />}


        </>
    )
}