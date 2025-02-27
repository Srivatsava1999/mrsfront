import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import DisplayScreenComponent from "../components/DisplayScreenComponent";
import ShowForm from "../components/ShowForm";
import "./ScheduleShow.css";


const ScheduleShow=()=>{
    

    return(
        <section className="app-container">
        <EnterpriseNavbarComponent/>
        <main>
          <h1>Movie Reservation System</h1>
          <h2>Schedule Show</h2>
          <ShowForm />
      </main>
    </section>
    );
}

export default ScheduleShow