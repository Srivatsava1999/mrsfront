import React, { useState } from "react";
import "./MovieForm.css";
function MovieForm(){

    const [movie,setMovie]=useState({
        movieTitle:"",
        duration:"",
        rating:"",
        release_date:""
    });
    const [message, setMessage]=useState("");

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setMovie({...movie,[name]:value});
    };

    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{
            const response=await fetch("http://127.0.0.1:8000/movies/",
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(movie),
                });
                if (response.ok){
                    setMessage("Movie added successfully!");
                    setMovie({
                        movieTitle:"",
                        duration:"",
                        rating:"",
                        release_date:""
                    });
                }
                else{
                    setMessage("Error adding movie. Please try again.");
                }
                }catch(error){
                    setMessage("Server error. Please check your backend");
                }
                };

    return (
        <section className="input_form">
            <h2>Add Movie</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input placeholder="Enter Title" type="text" name="movieTitle" value={movie.movieTitle} onChange={handleChange} required />
                <label>Duration:</label>
                <input placeholder="Enter Duration In Minutes" type="text" name="duration" value={movie.duration} onChange={handleChange} required/>
                <label>Censor Rating:</label>
                <input placeholder="Enter Rating" type="text" name="rating" value={movie.rating} onChange={handleChange} required/>
                <label>Release Date:</label>
                <input placeholder="Release Date" type="date" name="release_date" value={movie.release_date} onChange={handleChange} required/>

                <button type="submit">Add Movie</button>

            </form>
        </section>
    );
};

export default MovieForm;