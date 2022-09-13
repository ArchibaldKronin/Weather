import './App.css';
import { getData, getDaysTimeline, getHoursTimeline, getTodauHourWeather, getValues, getThreeDaysInterval, getTomorrowInterval, getWeatherState } from './functions/getData';
import { WEATHER_CONSTANTS } from "./constants/weatherConstants";
import { serverResponseObj } from './example';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { WeatherMainPage } from './components/WeatherMainPage/WeatherMainPage';
import { urlRequest } from './constants/requestConstants';

// const data = getData(urlRequest);
// console.log(data);

// let test = getInitialState(serverResponseObj);
// console.log(test);

function App() {
  return (
    <BrowserRouter>
      <div className='bodyDiv'>
        <header>
          Це заголовок в нем логотип
          <nav className='navClass'>
            <ul>
              <li>
                <NavLink to='/weather'>Weather</NavLink>
              </li>
              <li>
                <NavLink to='/contacts'>Contacts</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/weather' element={<WeatherMainPage />} />
            <Route path='/contacts' element={<div>Тут контакты</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;


