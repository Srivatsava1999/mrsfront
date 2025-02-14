import logo from './logo.svg';
import './App.css';
import React from 'react';
import AddMovie from './pages/addmovie';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTheatre from './pages/AddTheatre';
import SelectTheatrePage from './pages/SelectTheatrePage';
import AddScreen from './pages/AddScreen';
import SelectScreen from './pages/SelectScreen';
import DisplayAudi from './pages/DisplayAudi';
import ScheduleShow from './pages/ScheduleShow';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/add-movie/" element={<AddMovie />} />
          <Route path="/add-theatre/" element={<AddTheatre />} />
          <Route path='/theatre/' element={<SelectTheatrePage/>}></Route>
          <Route path='/theatre/:theatreId/screen/' element={<AddScreen/>}></Route>
          <Route path='/select-screen/:theatreId/screen/' element={<SelectScreen/>}></Route>
          <Route path='/screen/:screenId/seats/' element={<DisplayAudi/>}></Route>
          <Route path='/scheduleshow/' element={<ScheduleShow/>}></Route>
        </Routes>
      </Router>
    
  );
}

export default App;
