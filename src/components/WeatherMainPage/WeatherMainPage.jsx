import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { REQUEST_STATUS } from "../../constants/internalConstants";
import { getURL } from "../../functions/getData";
import { useAxios } from "../../hooks/useAxios";
import { clickedThreeDays, clickedToday, clickedTomorrow, selectWeather } from "../../store/dateSlice/weatherSlice";
import { changedTimer, selectRefresh, startedTimer, timerCanceled } from "../../store/refreshSlice/refreshSlice";
import { Loader } from "../Loader/Loader";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { Weather } from "../Weather/Weather";
import styles from './WeatherMainPage.module.css';


export const WeatherMainPage = (props) => {
    const dispatch = useDispatch();

    const { dateToShowWeather, refreshButtonFlag } = useSelector(selectWeather);
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
    }, getURL(dateToShowWeather), [dateToShowWeather, refreshFlagForUseEffect, refreshButtonFlag])

    const handleTodayClick = () => { dispatch(clickedToday()); console.log(state) }

    const handleTomorrowClick = () => { dispatch(clickedTomorrow()); console.log(state) };

    const handleThreeDaysClick = () => { dispatch(clickedThreeDays()); console.log(state) };
    ////////////////////////////////////////////////////////////////
    const handleCancelTimer = () => { dispatch(timerCanceled()) };
    const handlestartTimer = () => { dispatch(changedTimer()) };
    /////////////////////////////////////////////////////////

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.greatingsTextContainer}><p className={styles.greatingsText}>Choos period</p></div>
                <div className={styles.buttonsContainer}>
                    <button className={styles.buttons} onClick={handleTodayClick}><span className={styles.buttonText}>Today</span></button>
                    <button className={styles.buttons} onClick={handleTomorrowClick}><span className={styles.buttonText}>Tomorrow</span></button>
                    <button className={styles.buttons} onClick={handleThreeDaysClick}><span className={styles.buttonText}>Three days</span></button>
                    {/* <button onClick={handleCancelTimer}>отменить тайсмер</button> */}
                    {/* <button onClick={handlestartTimer}>вкключить тайсмер</button> */}
                </div>
            </div>

            <div className={styles.contentConteiner}>

                {state.status === REQUEST_STATUS.PENDING && <Loader />}

                {state.status === REQUEST_STATUS.ERROR && <ErrorPage errorObj={state.error} />}

                {state.status === REQUEST_STATUS.FULFILLED && <Weather data={state.data} />}
            </div>
        </div>
    )
}