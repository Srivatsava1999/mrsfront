import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./DisplayScreenComponent.css";

const DisplayScreenComponent=({screenId, theatreId})=>{
    const [screen,setScreen]=useState([]);
    const [message,setMessage]=useState("");
    const [theatre,setTheatre]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    const navigate=useNavigate();
    const requestBody={
        refresh: user.refresh,
    };
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/theatre/${theatreId}/screen/${screenId}/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`
            },
            // body: JSON.stringify(requestBody),
        }).then(response=>response.json())
        .then(data=>{
            const { new_access_token, ...screenData}=data;
            setScreen(screenData);
            if (new_access_token){
                user.access=new_access_token;
                localStorage.setItem("user", JSON.stringify(user));
            }
        }).then(setMessage("Fetched Screen Details Successfully"))
        .catch(error=>console.error("error fetching screen details",error));
    },[]);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/theatres/${theatreId}/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`
            },
        }).then(response=>response.json()).then(data=>{
            const {new_access_token, ...theatreData}=data;
            setTheatre(theatreData);
            if (new_access_token){
                user.access=new_access_token;
                localStorage.setItem("user", JSON.stringify(user));
            }
        }).catch(error=>console.error("error fetching theatre details",error));
    },[]);
    
    return (
        <section className="display_form">
            <h2>Screen Details</h2>
            {message && <p>{message}</p>}
                <p>Screen Number:</p>
                <p>{screen.screenNum}</p>
                <p>Screen Capacity:</p>
                <p>{screen.capacity}</p>
                <p>Theatre:</p>
                <p>{theatre.theatreName}</p>
            <button className="button-display-audi"
                onClick={() => navigate(`/screen/${screen.screenId}/seats/`)}
            >
                Display Auditorium
            </button>
        </section>

    );
}

export default DisplayScreenComponent