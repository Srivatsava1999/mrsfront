import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import NavbarComponent from "../components/NavbarComponent";
import "./PublicMoviePage.css";

const PublicMoviePage=()=>{
    const navigate=useNavigate()
    const [movies,setMovies]=useState([]);
    const [selectedMovie, setSelectedMovie]=useState("")

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_API_URL}/moviesall/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            },
        }).then(response => response.json()).then(data=>{
            const movieArray=Object.values(data);
            setMovies(movieArray);})
        .catch(error=>console.error("Error fetching theatres", error));
      }, []);
    const HandleSubmit=()=>{
        fetch(`${process.env.REACT_APP_BASE_API_URL}/movieall/${selectedMovie}/showall/`,{
            method: "GET",
            headers:{
            "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data=>{
            const showArray = Object.values(data);  
            navigate(`/view-shows/${selectedMovie}/`, {state:{shows: showArray}});
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
            <h2>Select Movie</h2>
            <DropdownComponent
            options={movies}
            labelKey="movieTitle"
            valueKey="movieId"
            onChange={(value) => setSelectedMovie(value)}
            />
            </section>
            <section className="buttons" >
            <button
                onClick={HandleSubmit}
                disabled={!selectedMovie}
            >
                View Shows
            </button>
            </section>
        </main>
      </section>
    );
}

export default PublicMoviePage