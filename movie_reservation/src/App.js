import logo from './logo.svg';
import './App.css';
import React from 'react';
import AddMovie from './pages/addmovie';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTheatre from './pages/AddTheatre';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/add-theatre" element={<AddTheatre />} />
        </Routes>
      </Router>
    
  );
}

export default App;
