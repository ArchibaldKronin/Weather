import React from "react";

export const Weather = ({ data }) => {

    return (
        <div>
            {data.map(interval => {
                return (
                    <div key={interval.startTime}>
                        <h3>{interval.startTime}</h3>
                        <h4>{interval.weatherCode}</h4>
                        <p>{`Облачность: ${interval.weatherValues.cloudCover}%`}</p>
                        <p>{`Температура: ${interval.weatherValues.temperature} градусов Цельсия`}</p>
                        <p>{`Скорость ветра: ${interval.weatherValues.windSpeed} м/с`}</p>
                    </div>
                )

            }
            )}
        </div>
    )
}
