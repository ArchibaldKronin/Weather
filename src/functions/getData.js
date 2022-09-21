import { getType } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';
import queryString from 'query-string';
import { DATE_TO_SHOW_WEATHER, REQUEST_STATUS } from '../constants/internalConstants';

export const getURL = (dateToShow) => {
    switch (dateToShow) {
        case DATE_TO_SHOW_WEATHER.TODAY:
            return getTodayRequest();
        case DATE_TO_SHOW_WEATHER.TOMORROW:
            return getTomorrowRequest();
        case DATE_TO_SHOW_WEATHER.THREE_DAYS:
            return getThreeDaysRequest();
    }
}

function getTodayRequest() {
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
    const apikey = "fAyJ7uPi2mzyQeRVZvYjd41IgAvDBeXZ";
    const location = [51.668551, 39.192137];
    const fields = [
        "precipitationIntensity",
        "precipitationType",
        "windSpeed",
        "windGust",
        "windDirection",
        "temperature",
        "temperatureApparent",
        "cloudCover",
        "cloudBase",
        "cloudCeiling",
        "weatherCode",
    ];
    const units = "metric";
    const timesteps = ["1h"];
    const now = moment();
    const startTime = moment(now).add(0, "minutes").toISOString();
    const endTime = moment().endOf('day').add(1, 'hour').toISOString();
    const timezone = "Europe/Moscow";
    const getTimelineParametersToday = queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
    }, { arrayFormat: "comma" });

    return `${getTimelineURL}?${getTimelineParametersToday}`;
}

function getTomorrowRequest() {
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
    const apikey = "fAyJ7uPi2mzyQeRVZvYjd41IgAvDBeXZ";
    const location = [51.668551, 39.192137];
    const fields = [
        "precipitationIntensity",
        "precipitationType",
        "windSpeed",
        "windGust",
        "windDirection",
        "temperature",
        "temperatureApparent",
        "cloudCover",
        "cloudBase",
        "cloudCeiling",
        "weatherCode",
    ];
    const units = "metric";
    const timesteps = ["1d"];
    const now = moment();
    const startTime = moment(now).add(1, "days").toISOString();
    const endTime = moment(now).add(2, "days").toISOString();
    const timezone = "Europe/Moscow";
    const getTimelineParametersTomorrow = queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
    }, { arrayFormat: "comma" })

    return `${getTimelineURL}?${getTimelineParametersTomorrow}`
}

function getThreeDaysRequest() {
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
    const apikey = "fAyJ7uPi2mzyQeRVZvYjd41IgAvDBeXZ";
    const location = [51.668551, 39.192137];
    const fields = [
        "precipitationIntensity",
        "precipitationType",
        "windSpeed",
        "windGust",
        "windDirection",
        "temperature",
        "temperatureApparent",
        "cloudCover",
        "cloudBase",
        "cloudCeiling",
        "weatherCode",
    ];
    const units = "metric";
    const timesteps = ["1d"];
    const now = moment();
    const startTime = moment(now).add(1, "days").toISOString();
    const endTime = moment(now).add(3, "days").toISOString();
    const timezone = "Europe/Moscow";
    const getTimelineParametersThreeDays = queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
      }, { arrayFormat: "comma" })
      
      return `${getTimelineURL}?${getTimelineParametersThreeDays}`
}