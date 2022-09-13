import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from "../../constants/internalConstants";
import { urlRequestThreeDays, urlRequestToday, urlRequestTomorrow } from "../../constants/requestConstants";
import { getData, getURL } from "../../functions/getData";
import { clickedThreeDays, clickedToday, clickedTomorrow, loadedWeather, selectWeather } from "../../store/request/weatherSlice";
import { weatherState } from "../../store/store";
import { Weather } from "../Weather/Weather";

export const WeatherMainPage = (props) => {

    const {dateToShowWeather} = useSelector(selectWeather);

    // const [dateToShow, setDateToShow] = useState(weatherData.dateToShowWeather);

    // const [weather, setWeather] = useState(getData(getURL(dateToShow))); //напиши функцию ГетВезер 

    const [state, setState] = useState({
        weather: null,
        status: REQUEST_STATUS.PENDING,
        error: null,
    })

    const dispatch = useDispatch();

    const handleTodayClick = async (e) => {
        dispatch(clickedToday());
        // let url = getURL(dateToShow);
        // await dispatch(loadedWeather(url));
    }

    const handleTomorrowClick = () => { dispatch(clickedTomorrow()) };

    const handleThreeDaysClick = () => { dispatch(clickedThreeDays()) };

    useEffect(() => {
        const loadData = async () => {
            setState({ ...state, status: REQUEST_STATUS.PENDING });
            try {
                // const weather = getData(getURL(dateToShow));
                // debugger
                // const url = getURL(dateToShow);
                const { data } = await axios.get(getURL(dateToShowWeather));
                // console.log(data)
                // let datajson = JSON.stringify(data);
                // console.log(datajson);
                setState({ ...state, weather: data, status: REQUEST_STATUS.FULFILLED });
            }
            catch (err) { setState({ ...state, error: err.message, status: REQUEST_STATUS.ERROR }) }
        }
        loadData();
    }, [dateToShowWeather]);


    return (
        <>
            <p>Главная часть, тут приветствие и погода</p>
            <button onClick={handleTodayClick}>Погода сегодня</button>
            <button onClick={handleTomorrowClick}>Погода завтра</button>
            <button onClick={handleThreeDaysClick}>Погода на три дня</button>
            <Weather>
                {JSON.stringify(state.weather)}
            </Weather>
        </>
    )
}