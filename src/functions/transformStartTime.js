import { DATE_TO_SHOW_WEATHER, MONTHS } from '../constants/internalConstants';

export const transformStartTime = (weatherObjectsArray, currentDateSelector) => {
    if (currentDateSelector === DATE_TO_SHOW_WEATHER.TODAY) {
        weatherObjectsArray = weatherObjectsArray.map((interval) => {
            interval.startTime = `${interval.startTime.hour()}:00`;
            return interval;
        })
    }
    else {
        weatherObjectsArray = weatherObjectsArray.map((interval) => {
            const month = interval.startTime.month();
            interval.startTime = `${interval.startTime.date()} ${MONTHS[month]}`
            return interval;
        })
    }
    return weatherObjectsArray;
}