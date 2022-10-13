import './App.css';
import React, { createContext, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { WeatherMainPage } from './components/WeatherMainPage/WeatherMainPage';
import { Wrapper } from './components/Wrapper/Wrapper';
import { LinesGroup1 } from './components/icons/LinesGroup1';
import { LinesGroup2 } from './components/icons/LinesGroup2';
import { LinesGroup3 } from './components/icons/LinesGroup3';
import { LinesGroup4 } from './components/icons/LinesGroup4';
import { LinesGroup5 } from './components/icons/LinesGroup5';
import { ContactsPage } from './components/ContactsPage/ContactsPage';

const themes = {
  dark: 'dark',
  light: 'light'
}

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  }

  //Чтобы не пересоздавался объект value для контекста на каждом рендере App
  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    };
  }, [theme]);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={themeContextValue}>
        <Wrapper className='wrapper'>
          <div className="ellipse1"></div>
          <div className="ellipse2"></div>
          <div className="ellipse3"></div>
          <div className="ellipse4"></div>
          <LinesGroup1 />
          <LinesGroup2 />
          <LinesGroup3 />
          <LinesGroup4 />
          <LinesGroup5 />

          <header className='headerMenu'>
            <h1 className='logo'>Weather app</h1>
            <nav className='navClass'>
              <ul className='menu'>
                <li>
                  <NavLink to='/weather' className="navigationLink">Weather</NavLink>
                </li>
                <li>
                  <NavLink to='/contacts' className="navigationLink">Contacts</NavLink>
                </li>
              </ul>
            </nav>
            <button onClick={toggleTheme} className='changeThemeButton'><span className='changeThemeSpan'>Change theme</span></button>
          </header>
          <main>
            <div className='sloganWrapper'>
              <div className='slogan'>
                <p>Seeing the weather of the whole Moscow with <span className='homePage'>Weather App!</span></p>
              </div>
            </div>
            <Routes>
              <Route path='/weather' element={<WeatherMainPage />} />
              <Route path='/contacts' element={<ContactsPage />} />
            </Routes>
          </main>
        </Wrapper>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;


