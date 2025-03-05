
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PublicShowComponent.css";

const PublicShowComponent=({selectedShow})=>{
    const navigate=useNavigate();
    const [show,setShow]=useState([]);
    const showtype=['null','Morning Show', 'Matinee Show', 'First Show', 'Second Show']
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_API_URL}/get-show/${selectedShow}/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
        }).then(response => response.json()).then(data=>{
            setShow(data);
        })
        .catch(error=>console.error("Error fetching show details", error));
    }, []);
    return (
        <section className="display_form">
            <h2>Show Details</h2>
                <p>Show Type:</p>
                <p>{showtype[show.showTypeId]}</p>
                <p>Movie:</p>
                <p>{show.movieTitle}</p>
                <p>Theatre:</p>
                <p>{show.theatreName}</p>
            <button className="button-display-audi"
                onClick={() => navigate(`/show/${show.screenId}/seats/`)}
            >
                Select Seats
            </button>
        </section>

    );
}

export default PublicShowComponent