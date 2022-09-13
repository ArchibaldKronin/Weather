import { getType } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from '../constants/internalConstants';
import { urlRequestThreeDays, urlRequestToday, urlRequestTomorrow } from '../constants/requestConstants';



export const getData = async (url) => {
    try {
        const { data } = await axios.get(url);
        // console.log(data)
        let datajson = JSON.stringify(data);
        // console.log(datajson);
        return data;
    }
    catch (err) { console.log(err); }
}










export const getDaysTimeline = (obj) => {
    let { data: { timelines } } = obj;
    return timelines[0];
}

//УБЕРИ ЭТО БЛЯТЬ КОГДА STARTTIME В СТОР ЗАПИХНЕШЬ
let startTimeShit = null;
//______________________
export const getHoursTimeline = (obj) => {
    let { data: { timelines } } = obj;
    //УБЕРИ ЭТО БЛЯТЬ КОГДА STARTTIME В СТОР ЗАПИХНЕШЬ
    let mmnt = moment.utc(timelines[1].startTime);
    startTimeShit = mmnt.date();
    //______________________

    return timelines[1];
}

function getIntervalsMethod(timelineObj) {
    let { intervals } = timelineObj;
    return intervals;
}

export const getThreeDaysInterval = (arr) => {
    let tempArray = arr.slice();
    if (arr.length > 3) {
        tempArray.splice(0, 1);
        tempArray.splice(3);
    }
    return tempArray;
}

export const getTomorrowInterval = (arr) => {
    let tempArray = arr.slice();
    return tempArray.splice(1, 1);
}

//ДАТА И ВРЕМЯ ПЕРВОГО ИНТЕРВАЛА ДОЛЖНЫ ХРАНИТЬСЯ В СТОРЕ ИЛИ В КОНТЕКСЕ! ИСПРАВЬ!!!!
export const getTodauHourWeather = (intervalHour) => {
    let todayWeather = intervalHour.filter(interval => {
        let startTime = moment.utc(interval.startTime);
        startTime = startTime.date();
        return startTime === startTimeShit;
    });
    return todayWeather;
}

export const getWeatherState = (responseObject) => {
    const daysTimeline = getDaysTimeline(responseObject);
    const daysInterval = getIntervalsMethod(daysTimeline);
    const hoursTimeline = getHoursTimeline(responseObject);
    const hoursInterval = getIntervalsMethod(hoursTimeline);

    const threeDaysIntervalDay = getThreeDaysInterval(daysInterval);

    const tomorrowIntervalDay = getTomorrowInterval(daysInterval);

    const todayIntervalHour = getTodauHourWeather(hoursInterval);

    const { startTime } = todayIntervalHour[0];

    return {
        startTime,
        todayWeather: todayIntervalHour,
        tomorrowWeather: tomorrowIntervalDay,
        threeDaysWeather: threeDaysIntervalDay,
        status: REQUEST_STATUS.IDLE,
        error: null
    }
}






export const getURL = (dateToShow) => {
    switch (dateToShow) {
        case DATE_TO_SHOW_WEATHER.TODAY:
            return urlRequestToday;
        case DATE_TO_SHOW_WEATHER.TOMORROW:
            return urlRequestTomorrow;
        case DATE_TO_SHOW_WEATHER.THREE_DAYS:
            return urlRequestThreeDays;
    }
}