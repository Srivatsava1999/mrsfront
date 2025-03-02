import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "../components/DropdownComponent";
import EnterpriseNavbarComponent from "../components/EnterpriseNavbarComponent";
import "./SelectTheatrePage.css";

const SelectTheatrePage=()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const requestBody={
        refresh: user.refresh,
    };
    const navigate=useNavigate()
    const [theatres,setTheatres]=useState([]);
    const [selectedTheatre, setSelectedTheatre]=useState("")

    useEffect(() => {
        fetch("http://127.0.0.1:8000/theatres/",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`
            },
            // body: JSON.stringify(requestBody),
        }).then(response => response.json()).then(data=>{
            const {new_access_token, ...theatreData}=data;
            const theatreArray = Object.values(theatreData);  
            console.log("Converted theatres:", theatreArray);
    
            setTheatres(theatreArray);
            console.log(theatreArray);
            if (data.new_access_token){
                user.access=new_access_token;
                localStorage.setItem("user", JSON.stringify(user));
            }
        }).catch(error=>console.error("Error fetching theatres", error));
      }, []);
    return (
        <section className="app-container">
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Young+Serif&display=swap');
          </style>
          <EnterpriseNavbarComponent/>
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
            <section className="buttons">
            <button
                onClick={() => navigate(`/select-screen/${selectedTheatre}/screen/`)}
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
            </section>
        </main>
      </section>
    );
}

export default SelectTheatrePage