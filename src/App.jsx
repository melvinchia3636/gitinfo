/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './lib/Home';
import Repo from './lib/pages/Repo';
import Navbar from './lib/Navbar';
import User from './lib/pages/User';
import { ThemeContext } from './lib/themeContext';
import Emojis from './lib/pages/Emojis';

function App() {
  const [theme, setTheme] = React.useState(localStorage.theme);
  const { themeColor } = React.useContext(ThemeContext);

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
    <div className={`${themeColor} w-full h-screen overflow-hidden relative bg-custom-500 dark:bg-custom-700 flex items-center justify-center`}>
      <div className="h-full shadow-2xl w-[calc(100vw-20rem)] bg-zinc-100 dark:bg-zinc-700 p-6 pb-0 flex flex-col">
        <Router>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:user/:reponame" element={<Repo />} />
            <Route path="/user/:username" element={<User />} />
            <Route path="/emojis" element={<Emojis />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
