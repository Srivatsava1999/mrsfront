import React from "react";
import TheatreForm from "../components/TheatreForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./AddTheatre.css";

const AddTheatre =()=> {
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <EnterpriseNavbarComponent/>
          <main>
            <TheatreForm/>
        </main>
      </section>
    );
  }
  
  export default AddTheatre;