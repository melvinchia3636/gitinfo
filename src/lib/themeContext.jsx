/* eslint-disable func-names */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import './assets/index.css';

export const ThemeContext = React.createContext();

export default function ({ children }) {
  const storedColour = (localStorage.getItem('themeColor')) ? (localStorage.getItem('themeColor')) : 'theme-orange';
  const [themeColor, setThemeColor] = React.useState(storedColour);

  const defaultContext = {
    themeColor,
    setThemeColor,
  };

  return (
    <ThemeContext.Provider value={defaultContext}>
      {children}
    </ThemeContext.Provider>
  );
}
