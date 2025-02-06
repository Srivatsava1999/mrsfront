import React, { useState } from "react";
import "./TheatreForm.css";
function TheatreForm(){

    const [theatre,setTheatre]=useState({
        theatreName:"",
        address:"",
        locationCity:"",
        locationState:""
    });
    const [message, setMessage]=useState("");

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setTheatre({...theatre,[name]:value});
    };

    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{
            const response=await fetch("http://127.0.0.1:8000/theatres/",
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(theatre),
                });
                if (response.ok){
                    setMessage("theatre added successfully!");
                    setTheatre({
                        theatreName:"",
                        address:"",
                        locationCity:"",
                        locationState:""
                    });
                }
                else{
                    setMessage("Error adding theatre. Please try again.");
                }
                }catch(error){
                    setMessage("Server error. Please check your backend");
                }
                };

    return (
        <section className="input_form">
            <h2>Add Theatre</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="theatreName" value={theatre.theatreName} onChange={handleChange} required />
                <label>Address:</label>
                <input type="text" name="address" value={theatre.address} onChange={handleChange} />
                <label>City:</label>
                <input type="text" name="locationCity" value={theatre.locationCity} onChange={handleChange} required/>
                <label>State</label>
                <input type="text" name="locationState" value={theatre.locationState} onChange={handleChange} required/>

                <button type="submit">Add Theatre</button>

            </form>
        </section>
    );
};

export default TheatreForm;