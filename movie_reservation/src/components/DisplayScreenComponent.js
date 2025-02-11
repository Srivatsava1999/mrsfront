import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayScreenComponent.css";

const DisplayScreenComponent=({screenId, theatreId})=>{
    const [screen,setScreen]=useState([]);
    const [message,setMessage]=useState("");
    const [theatre,setTheatre]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/theatre/${theatreId}/screen/${screenId}/`).then(response=>response.json())
        .then(data=>setScreen(data)).then(setMessage("Fetched Screen Details Successfully"))
        .catch(error=>console.error("error fetching screen details",error));
    },[]);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/theatres/${theatreId}/`).then(response=>response.json())
        .then(data=>setTheatre(data))
        .catch(error=>console.error("error fetching theatre details",error));
    },[]);
    
    return (
        <section className="display_form">
            <h2>Screen Details</h2>
            {message && <p>{message}</p>}
            <section className="form">
                <p>Screen Number:</p>
                <p>{screen.screenNum}</p>
                <p>Screen Capacity:</p>
                <p>{screen.capacity}</p>
                <p>Theatre:</p>
                <p>{theatre.theatreName}</p>
            </section>
            <button
                onClick={() => navigate(`/screen/${screen.screenId}/seats/`)}
            >
                Display Auditorium
            </button>
        </section>

    );
}

export default DisplayScreenComponent