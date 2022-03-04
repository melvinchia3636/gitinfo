/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './lib/Home';
import Repo from './lib/pages/Repo';
import Navbar from './lib/Navbar';
import User from './lib/pages/User';
import { ThemeContext } from './lib/themeContext';
import Emojis from './lib/pages/Emojis';
import Templates from './lib/pages/Templates';
import Explore from './lib/pages/Explore';

function App() {
  const [theme, setTheme] = React.useState(localStorage.theme);
  const { themeColor } = React.useContext(ThemeContext);

  useEffect(() => {
    const color = getComputedStyle(document.querySelector(`.${themeColor}`)).getPropertyValue('--color-custom-500');
    let link = document.querySelector("link[rel~='icon']");
    if (link) link.remove();
    link = document.createElement('link');
    link.rel = 'icon';
    link.sizes = 'any';
    link.type = 'image/svg+xml';
    document.getElementsByTagName('head')[0].appendChild(link);
    link.href = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_4_6)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9195 0C7.57149 0 0 7.57149 0 16.9195C0 24.4064 4.84322 30.7301 11.5687 32.972C12.4147 33.12 12.732 32.6124 12.732 32.1683C12.732 31.7664 12.7108 30.434 12.7108 29.017C8.45977 29.7995 7.36 27.9807 7.02161 27.029C6.83126 26.5425 6.00644 25.0409 5.28736 24.6391C4.69517 24.3218 3.8492 23.5393 5.26621 23.5182C6.59862 23.497 7.55034 24.7448 7.86759 25.2524C9.39034 27.8115 11.8225 27.0924 12.7954 26.6483C12.9434 25.5485 13.3876 24.8083 13.874 24.3853C10.1094 23.9623 6.17563 22.503 6.17563 16.0313C6.17563 14.1913 6.83126 12.6685 7.90989 11.4841C7.74069 11.0612 7.14851 9.3269 8.07908 7.00046C8.07908 7.00046 9.49609 6.55632 12.732 8.73471C14.0855 8.35402 15.5237 8.16368 16.9618 8.16368C18.4 8.16368 19.8382 8.35402 21.1917 8.73471C24.4276 6.53517 25.8446 7.00046 25.8446 7.00046C26.7752 9.3269 26.183 11.0612 26.0138 11.4841C27.0924 12.6685 27.748 14.1701 27.748 16.0313C27.748 22.5241 23.7931 23.9623 20.0285 24.3853C20.6418 24.914 21.1706 25.9292 21.1706 27.5154C21.1706 29.7784 21.1494 31.5972 21.1494 32.1683C21.1494 32.6124 21.4667 33.1412 22.3126 32.972C25.6714 31.838 28.59 29.6792 30.6577 26.7997C32.7254 23.9201 33.8381 20.4646 33.8391 16.9195C33.8391 7.57149 26.2676 0 16.9195 0Z" fill="${color}"/>
    </g>
    <defs>
    <clipPath id="clip0_4_6">
    <rect width="33.8391" height="33.8391" fill="white"/>
    </clipPath>
    </defs>
    </svg>
    `)}`;
  }, [themeColor]);

  React.useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  return (
    <main className={`${themeColor} min-w-0 min-h-0 w-full overflow-hidden relative bg-custom-500 dark:bg-custom-700 flex items-center justify-center`}>
      <div className="h-full min-w-0 shadow-2xl shadow-zinc-500 w-full mx-3 md:mx-8 bg-zinc-100 dark:bg-zinc-800 p-6 pb-0 flex flex-col">
        <Router>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/repo/:user/:reponame" element={<Repo />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/emojis" element={<Emojis />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;
