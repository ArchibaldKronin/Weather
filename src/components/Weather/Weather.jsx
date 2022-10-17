import React from "react";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import styles from './Weather.module.css';

export const Weather = ({ data }) => {

    return (
        <div className={styles.weatherContainer}>
            {data.map(interval => {
                return (
                    <div key={interval.startTime}>
                        {/* <h3>{interval.startTime}</h3>
                        <h4>{interval.weatherCode}</h4>
                        <p>{`Облачность: ${interval.weatherValues.cloudCover}%`}</p>
                        <p>{`Температура: ${interval.weatherValues.temperature} градусов Цельсия`}</p>
                        <p>{`Скорость ветра: ${interval.weatherValues.windSpeed} м/с`}</p> */}
                        <WeatherCard startTime={interval.startTime} weatherValues={
                            {
                                cloudCover: interval.weatherValues.cloudCover,
                                temperature: interval.weatherValues.temperature,
                                windSpeed: interval.weatherValues.windSpeed
                            }}
                            weatherCode={interval.weatherCode} />
                    </div>
                )

            }
            )}
        </div>
    )
}
