import React from "react";
import NavbarComponent from "../components/NavbarComponent.js";
import LoginForm from "../components/LoginForm.js";
import "./LoginPage.css";

const LoginPage =()=> {
    return (
      <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <LoginForm/>
        </main>
      </section>
    );
  }
  
  export default LoginPage;