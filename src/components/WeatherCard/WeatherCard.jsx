import React from 'react';
import styles from './WeatherCard.module.css';

export const WeatherCard = ({ weatherCode, startTime, weatherValues }) => {
    return (
        <div className={styles.weatherCardContainer}>
            <div className={styles.icon}>
                {weatherCode}
            </div>
            <div className={styles.weatherCard}>
                <h3 className={styles.time}>
                    {startTime}
                </h3>
                <div className={styles.weatherParamsContainer}>
                    Температура: <span className={styles.weatherParams}>{weatherValues.temperature} С</span>
                </div>
                <div className={styles.weatherParamsContainer}>
                    Облачность: <span className={styles.weatherParams}>{weatherValues.cloudCover} %</span>
                </div>
                <div className={styles.weatherParamsContainer}>
                    Скорость ветра: <span className={styles.weatherParams}>{weatherValues.windSpeed} м/с</span>
                </div>
            </div>
        </div>
    )
}
