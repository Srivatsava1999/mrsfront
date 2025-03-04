import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import DisplayScreenComponent from "../components/DisplayScreenComponent";
import "./PublicShowPage.css";

const PublicShowPage=()=>{
  const {theatreId}=useParams()
  const [shows,setShows]=useState([]);
  const [movies, setMovies]=useState([]);
  const [selectedShow, setSelectedShow]=useState("")

  useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_API_URL}/theatresall/${theatreId}/showall/`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(data=>{
            const showArray = Object.values(data);  
      setShows(showArray)
    }).catch(error=>console.error("Error fetching Shows", error));
    }, []);
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_BASE_API_URL}/moviesall/`).then(respone=>respone.json()).then(data=>setMovies(data))
      .catch(error=>console.error("Error fetching Shows", error));
    });
  return (
      <section className="app-container">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
        <EnterpriseNavbarComponent/>
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
          {selectedScreen &&(
            <DisplayScreenComponent showId={selectedShow} theatreId={theatreId}/>
          )}
      </main>
    </section>
  );
}

export default PublicShowPage