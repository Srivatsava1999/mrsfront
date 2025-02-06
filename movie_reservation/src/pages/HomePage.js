import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import "./HomePage.css";

const HomePage =()=> {
    return (
      <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <h2>Welcome!!!</h2>
        </main>
      </section>
    );
  }
  
  export default HomePage;