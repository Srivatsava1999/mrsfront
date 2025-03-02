import React from "react";
import MovieForm from "../components/MovieForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./addmovie.css";

const AddMovie =()=> {
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <EnterpriseNavbarComponent/>
          <main>
            <MovieForm/>
        </main>
      </section>
    );
  }
  
  export default AddMovie;