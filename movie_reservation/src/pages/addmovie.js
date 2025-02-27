import React from "react";
import MovieForm from "../components/MovieForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./addmovie.css";

const AddMovie =()=> {
    return (
      <section className="app-container">
          <EnterpriseNavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <MovieForm/>
        </main>
      </section>
    );
  }
  
  export default AddMovie;