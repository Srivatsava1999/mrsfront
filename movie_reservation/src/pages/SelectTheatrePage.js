import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import NavbarComponent from "../components/NavbarComponent";
import "./SelectTheatrePage.css"

const SelectTheatrePage=()=>{

    const navigate=useNavigate()
    const [theatres,setTheatres]=useState([]);
    const [selectedTheatre, setSelectedTheatre]=useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/theatres/").then(response => response.json()).then(data=>setTheatres(data))
        .catch(error=>console.error("Error fetching theatres", error));
      }, []);
    return (
        <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <h2>Select Theatre</h2>
            <DropdownComponent
            options={theatres}
            labelKey="theatreName"
            valueKey="theatreId"
            onChange={(value) => setSelectedTheatre(value)}
            />
            <button
                onClick={() => navigate(`/select-screen/${selectedTheatre}/`)}
                disabled={!selectedTheatre}
            >
                Select Screen
            </button>

            <button
                onClick={() => navigate(`/theatre/${selectedTheatre}/screen/`)}
                disabled={!selectedTheatre}
            >
                Add Screen
            </button>
        </main>
      </section>
    );
}

export default SelectTheatrePage