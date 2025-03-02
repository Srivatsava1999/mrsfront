import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import "./HomePage.css";

const HomePage =()=> {
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <NavbarComponent/>
          <main>
            <h1 className="welcome-tag">Welcome!!!</h1>
        </main>
      </section>
    );
  }
  
  export default HomePage;