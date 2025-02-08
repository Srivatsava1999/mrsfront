import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import NavbarComponent from "../components/NavbarComponent";
import DisplayScreenComponent from "../components/DisplayScreenComponent";
import "./SelectScreen.css";

const SelectScreen=()=>{
    const {theatreId}=useParams()
    const [screens,setScreens]=useState([]);
    const [selectedScreen, setSelectedScreen]=useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/theatre/${theatreId}/screen/`).then(response => response.json()).then(data=>setScreens(data))
        .catch(error=>console.error("Error fetching screens", error));
      }, []);
    return (
        <section className="app-container">
          <NavbarComponent/>
          <main>
            <h1>Movie Reservation System</h1>
            <h2>Select Screen</h2>
            <DropdownComponent
            options={screens}
            labelKey="screenNum"
            valueKey="screenId"
            onChange={(value) => setSelectedScreen(value)}
            />
            {selectedScreen &&(
              <DisplayScreenComponent screenId={selectedScreen} theatreId={theatreId}/>
            )}
        </main>
      </section>
    );
}

export default SelectScreen