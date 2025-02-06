import React from "react";
import MovieForm from "../components/MovieForm";
import NavbarComponent from "../components/NavbarComponent";
import "./addmovie.css";

const AddMovie =()=> {
    return (
      <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <MovieForm/>
        </main>
      </section>
    );
  }
  
  export default AddMovie;