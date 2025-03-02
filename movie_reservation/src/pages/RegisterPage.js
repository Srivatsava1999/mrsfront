import React from "react";
import NavbarComponent from "../components/NavbarComponent.js";
import RegisterForm from "../components/RegisterForm.js";
import "./RegisterPage.css";

const RegisterPage =()=> {
    return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <NavbarComponent/>
          <main>
            <RegisterForm/>
        </main>
      </section>
    );
  }
  
  export default RegisterPage;