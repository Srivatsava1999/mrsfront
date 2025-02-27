import React from "react";
import NavbarComponent from "../components/NavbarComponent.js";
import RegisterForm from "../components/RegisterForm.js";
import "./RegisterPage.css";

const RegisterPage =()=> {
    return (
      <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <RegisterForm/>
        </main>
      </section>
    );
  }
  
  export default RegisterPage;