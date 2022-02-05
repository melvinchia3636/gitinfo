import React from 'react';
import ReactDOM from 'react-dom';
import './lib/assets/index.css';
import ThemeContextWrapper from './lib/themeContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextWrapper>
      <App />
    </ThemeContextWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);
