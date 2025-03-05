import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import NavbarComponent from "../components/NavbarComponent";
import "./PublicTheatrePage.css";

const PublicTheatrePage=()=>{
    const navigate=useNavigate()
    const [theatres,setTheatres]=useState([]);
    const [selectedTheatre, setSelectedTheatre]=useState("")
    const [shows,setShows]=useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/theatresall/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
        }).then(response => response.json()).then(data=>{
            const theatreArray=Object.values(data);
            setTheatres(theatreArray);})
        .catch(error=>console.error("Error fetching theatres", error));
      }, []);
    const HandleSubmit=()=>{
        fetch(`${process.env.REACT_APP_BASE_API_URL}/theatresall/${selectedTheatre}/showall/`,{
            method: "GET",
            headers:{
            "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data=>{
            const showArray = Object.values(data);  
            setShows(showArray)
        }).catch(error=>console.error("Error fetching Shows", error));
    };
    return (
        <section className="app-container">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <NavbarComponent/>
          <main className="select-main">
            <section className="selection">
            <h2>Select Theatre</h2>
            <DropdownComponent
            options={theatres}
            labelKey="theatreName"
            valueKey="theatreId"
            onChange={(value) => setSelectedTheatre(value)}
            />
            </section>
            <section className="buttons" >
            <button
                onClick={HandleSubmit}
                disabled={!selectedTheatre}
            >
                View Shows
            </button>
            </section>
        </main>
      </section>
    );
}

export default PublicTheatrePage