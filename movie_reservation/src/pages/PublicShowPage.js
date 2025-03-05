import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import NavbarComponent from "../components/NavbarComponent";
import PublicShowComponent from "../components/PublicShowComponent"
import "./PublicShowPage.css";

const PublicShowPage=()=>{
  const location=useLocation();
  const shows=location.state?.shows || [];
  const [selectedShow, setSelectedShow]=useState("");
  return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
        <NavbarComponent/>
        <main className="select-main">
          <section className="selection">
          <h2>Select Show</h2>
          <DropdownComponent
          options={shows}
          labelKey="movieTitle"
          valueKey="showId"
          onChange={(value) => setSelectedShow(value)}
          />
          </section>
          {selectedShow &&(
            <PublicShowComponent selectedShow={selectedShow}/>
          )}
      </main>
    </section>
  );
}

export default PublicShowPage