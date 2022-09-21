import moment from 'moment';

export const getWeatherObjects = (data) => {
    const intervals = getIntervals(data);
    return getWeatherAtIntervals(intervals);
}

function getIntervals(obj) {
    let { data: { timelines } } = obj;
    let {intervals} = timelines[0];
    return intervals;
}

function getWeatherAtIntervals(intervals) {
    return intervals.map((interval) => {
        return {
            startTime: moment(interval.startTime),
            weatherValues: {
                cloudCover: interval.values.cloudCover,
                temperature: interval.values.temperature,
                windSpeed: interval.values.windSpeed,
            },
            weatherCode: interval.values.weatherCode,
        }
    })
}