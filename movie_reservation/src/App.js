import logo from './logo.svg';
import './App.css';
import React from 'react';
import MovieForm from "./components/MovieForm";
import TheatreForm from "./components/TheatreForm";
import NavbarComponent from "./components/NavbarComponent";
import AddMovie from './pages/addmovie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <section className='app-container'>
      <NavbarComponent/>
        <main>
            <h1>Movie Reservation System</h1>
            <h2>Welcome!!!</h2>
        </main>
    </section>
  );
}

export default App;
