import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Repo from './Repo';
import Navbar from './Navbar';

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
      <div className="w-full h-full shadow-2xl m-32 bg-indigo-50 p-6 pb-0 flex flex-col">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repo/:user/:reponame" element={<Repo />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
