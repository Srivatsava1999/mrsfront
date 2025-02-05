import logo from './logo.svg';
import './App.css';
import React from 'react';
import MovieForm from "./components/MovieForm";
import TheatreForm from "./components/TheatreForm";

function App() {
  return (
    <section className="movieform">
      <h1>Movie Reservation System</h1>
      <MovieForm/>
      <TheatreForm/>
    </section>
  );
}

export default App;
