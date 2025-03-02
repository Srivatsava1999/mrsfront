import React from "react";
import NavbarComponent from "../components/NavbarComponent.js";
import LoginForm from "../components/LoginForm.js";
import "./LoginPage.css";

const LoginPage =()=> {
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <NavbarComponent/>
          <main>
            <LoginForm/>
        </main>
      </section>
    );
  }
  
  export default LoginPage;