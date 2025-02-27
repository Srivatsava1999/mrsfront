import React from "react";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./EnterpriseHomePage.css";

const EnterpriseHomePage =()=> {
    return (
      <section className="app-container">
          <EnterpriseNavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <h2>Welcome!!!</h2>
        </main>
      </section>
    );
  }
  
  export default EnterpriseHomePage;