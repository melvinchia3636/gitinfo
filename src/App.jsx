import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './lib/Home';
import Repo from './lib/Repo';
import Navbar from './lib/Navbar';
import User from './lib/User';

function App() {
  const [theme, setTheme] = React.useState(localStorage.theme);

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
    <div className="w-full h-screen overflow-hidden relative bg-gradient-to-br from-indigo-500 dark:from-indigo-900 to-purple-500 dark:to-purple-900 flex items-center justify-center">
      <div className="h-full shadow-2xl w-[calc(100vw-20rem)] bg-indigo-50 dark:bg-zinc-700 p-6 pb-0 flex flex-col">
        <Router>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:user/:reponame" element={<Repo />} />
            <Route path="/user/:username" element={<User />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
