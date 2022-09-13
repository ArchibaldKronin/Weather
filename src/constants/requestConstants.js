import queryString from 'query-string';
import { getData, getDaysTimeline, getHoursTimeline, getTodauHourWeather, getValues } from '../functions/getData';
import moment from 'moment';

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
const units = "imperial";
let timesteps = ["1h"];

const now = moment();
let startTime = moment(now).add(0, "minutes").toISOString();
// console.log(startTime)
// console.log(startTime);

// const nowDate = moment().endOf('day').toISOString();
// console.log(nowDate);
// let endTime = moment().endOf('day').fromNow();
// console.log(endTime);
let endTime = moment().endOf('day').toISOString();


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

export const urlRequestToday = `${getTimelineURL}?${getTimelineParametersToday}`;

timesteps = ["1d"];
startTime = moment(now).add(1, "days").toISOString();
console.log(now);
console.log(startTime);
endTime = moment(now).add(2, "days").toISOString();

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

export const urlRequestTomorrow = `${getTimelineURL}?${getTimelineParametersTomorrow}`

timesteps = ["1d"];
startTime = moment(now).add(1, "days").toISOString();
endTime = moment(now).add(3, "days").toISOString();

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

export const urlRequestThreeDays = `${getTimelineURL}?${getTimelineParametersThreeDays}`