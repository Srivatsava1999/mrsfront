import React from "react";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./EnterpriseHomePage.css";

const EnterpriseHomePage =()=> {
    return (
      <section className="app-container">
          <EnterpriseNavbarComponent/>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <main>
            <h1 className="welcome-tag">Welcome!!!</h1>
          </main>
      </section>
    );
  }
  
  export default EnterpriseHomePage;