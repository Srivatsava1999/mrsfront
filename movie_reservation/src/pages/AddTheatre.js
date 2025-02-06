import React from "react";
import TheatreForm from "../components/TheatreForm";
import NavbarComponent from "../components/NavbarComponent";
import "./AddTheatre.css";

const AddTheatre =()=> {
    return (
      <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <TheatreForm/>
        </main>
      </section>
    );
  }
  
  export default AddTheatre;