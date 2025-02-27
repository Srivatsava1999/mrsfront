import React from "react";
import TheatreForm from "../components/TheatreForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./AddTheatre.css";

const AddTheatre =()=> {
    return (
      <section className="app-container">
          <EnterpriseNavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <TheatreForm/>
        </main>
      </section>
    );
  }
  
  export default AddTheatre;