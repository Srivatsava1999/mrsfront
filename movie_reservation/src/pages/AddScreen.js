import React from "react";
import ScreenForm from "../components/ScreenForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./AddScreen.css";
import { useParams } from "react-router-dom";

const AddScreen =()=> {
    const { theatreId }=useParams();
    return (
      <section className="app-container">
          <EnterpriseNavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <ScreenForm theatreId={theatreId}/>
        </main>
      </section>
    );
  }
  
  export default AddScreen;