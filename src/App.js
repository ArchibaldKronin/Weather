import './App.css';
import { WEATHER_CONSTANTS } from "./constants/weatherConstants";
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { WeatherMainPage } from './components/WeatherMainPage/WeatherMainPage';

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


