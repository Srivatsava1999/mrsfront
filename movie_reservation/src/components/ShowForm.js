import { useState, useEffect} from "react";
import DropdownComponent from "./DropdownComponent";
import "./ShowForm.css";

const ShowForm = ()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const today = new Date().toISOString().split("T")[0];;
    const [movie,setMovie]=useState([]);
    const [theatre,setTheatre]=useState([]);
    const [selectedMovie, setSelectedMovie]=useState("");
    const [selectedTheatre, setSelectedTheatre]=useState("");
    const [selectedShowType, setSelectedShowType]=useState([]);
    const [selectedDates, setSelectedDates]=useState(today);
    const [message, setMessage]=useState("");
    

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/theatres/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`,
                "X-Refresh-Token": user.refresh,
                "X-User-Id": user.user_id
            },
        }).then(response => response.json()).then(data=>{
            const {new_access_token, ...theatreData}=data;
            const theatreArray = Object.values(theatreData);  
            setTheatre(theatreArray)})
        .catch(error=>console.error("Error fetching theatres", error));
    }, []);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/movies/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`,
                "X-Refresh-Token": user.refresh,
                "X-User-Id": user.user_id
            },
        }).then(response => response.json()).then(data=>{
            const {new_access_token, ...movieData}=data;
            const movieArray = Object.values(movieData);  
            setMovie(movieArray)})
        .catch(error=>console.error("Error fetching movies", error));
    }, []);
    const handleSubmit= async(event)=>{

        event.preventDefault();
        const POSTRequestBody = {
            theatreId: selectedTheatre,
            movieId: selectedMovie,
            showTypes: selectedShowType,
            releaseDate: selectedDates,
        };        

        try{
            const response=await fetch(`http://127.0.0.1:8000/theatre/${Number(selectedTheatre)}/show/`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${user.access}`,
                        "X-Refresh-Token": user.refresh,
                        "X-User-Id": user.user_id
                    },
                    body: JSON.stringify(POSTRequestBody),
                });
                const data = await response.json()
                if (response.ok){
                    setMessage("Show scheduled successfully!");
                    setSelectedTheatre("");
                    setSelectedMovie("");
                    setSelectedShowType([]);
                    setSelectedDates(today);
                    if (data.new_access_token){
                        user.access=data.new_access_token;
                        localStorage.setItem("user", JSON.stringify(user));
                    }
                }
                else{
                    setMessage("Error scheduling show. Please try again.");
                }
                }catch(error){
                    setMessage("Server error. Please check your backend");
                }
                };

    return (
        <section className="input_form">
            <h2>Schedule Show</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Select Theatre:</label>
                <DropdownComponent
                options={theatre}
                labelKey="theatreName"
                valueKey="theatreId"
                onChange={(value) => setSelectedTheatre(value)}
                />
                <label>Select Movie:</label>
                <DropdownComponent
                options={movie}
                labelKey="movieTitle"
                valueKey="movieId"
                onChange={(value) => setSelectedMovie(value)}
                />
                <label>Selected Show Type:</label>
                <select name="ShowType" id="ShowType" multiple onChange={(e)=>{
                    const selectedOptions=[...e.target.selectedOptions].map(option=>option.value);
                    setSelectedShowType(selectedOptions);
                }}>
                    <option value={1}>Morning Show</option>
                    <option value={2}>Matinee Show</option>
                    <option value={3}>First Show</option>
                    <option value={4}>Second Show</option>
                </select>
                <input type="date" id="releaseDate" name="Release Date" value={selectedDates} onChange={(e)=>setSelectedDates(e.target.value)}/>
                <button type="submit" className="button-confirm">Schedule Show</button>
            </form>
        </section>
    );
}

export default ShowForm