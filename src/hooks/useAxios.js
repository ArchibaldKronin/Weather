import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from "../constants/internalConstants";
import { changedTimer, timerCanceled, timerStarted } from "../store/refreshSlice/refreshSlice";
import { getWeatherObjects } from "../functions/getWeatherObject";
import { transformStartTime } from "../functions/transformStartTime";

export const useAxios = (initialValue, url, selectorsArray) => {

    const dispatch = useDispatch();

    initialValue = checkInitialState(initialValue);
    const [dateToShowWeather] = selectorsArray
    const [state, setState] = useState(initialValue);
    useEffect(() => {
        dispatch(timerCanceled());
        const loadData = async () => {
            setState({ ...state, status: REQUEST_STATUS.PENDING });
            try {
                const { data } = await axios.get(url);
                const weatherObjectsArray = getWeatherObjects(data);
                let weatherObjectsWithTime = transformStartTime(weatherObjectsArray, dateToShowWeather);
                weatherObjectsWithTime = correctTommorowData(weatherObjectsWithTime);
                setState({ ...state, data: weatherObjectsWithTime, status: REQUEST_STATUS.FULFILLED });
                dispatch(changedTimer());
            }
            catch (err) {
                console.log(err);
                dispatch(changedTimer());
                setState({ ...state, error: err.message, status: REQUEST_STATUS.ERROR })
            }
        }
        loadData();
    }, selectorsArray);

    return { state, setState };

    function correctTommorowData(data) {
        if (dateToShowWeather === DATE_TO_SHOW_WEATHER.TOMORROW) {
            data.splice(1, 1)
        }
        return data;
    }
}

const isObject = (obj) => {
    return obj === Object(obj) && Object.prototype.toString.call(obj) !== '[object Array]'
}

const checkInitialState = (obj) => {
    if (isObject(obj)) {
        if (!obj.hasOwnProperty('data')) { obj.data = null };
        if (!obj.hasOwnProperty('status')) { obj.status = REQUEST_STATUS.PENDING };
        if (!obj.hasOwnProperty('error')) { obj.error = null };
        return obj;
    }
    else {
        return { data: null, status: REQUEST_STATUS.PENDING, error: null, }
    }
}





