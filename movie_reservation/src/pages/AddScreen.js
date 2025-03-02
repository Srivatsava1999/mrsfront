import React from "react";
import ScreenForm from "../components/ScreenForm";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./AddScreen.css";
import { useParams } from "react-router-dom";

const AddScreen =()=> {
    const { theatreId }=useParams();
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <EnterpriseNavbarComponent/>
          <main>
            <ScreenForm theatreId={theatreId}/>
        </main>
      </section>
    );
  }
  
  export default AddScreen;