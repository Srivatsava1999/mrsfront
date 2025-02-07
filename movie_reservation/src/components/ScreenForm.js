import React, { useState,useEffect } from "react";
import "./ScreenForm.css";
function ScreenForm({theatreId}){

    const [screen,setScreen]=useState({
        screenNum:"",
        capacity:"",
        theatreId: theatreId
    });
    useEffect(() => {
        setScreen((prev) => ({ ...prev, theatreId }));
    }, [theatreId]);
    const [message, setMessage]=useState("");

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setScreen({...screen,[name]:value});
    };

    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{
            const response=await fetch(`http://127.0.0.1:8000/theatre/${Number(screen.theatreId)}/screen/`,
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(screen),
                });
                if (response.ok){
                    setMessage("Screen added successfully!");
                    setScreen({
                        screenNum:"",
                        capacity:"",
                        theatreId: theatreId
                    });
                }
                else{
                    setMessage("Error adding screen. Please try again.");
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
                <label>Screen Number:</label>
                <input placeholder="Screen Number" type="text" name="screenNum" value={screen.screenNum} onChange={handleChange} required />
                <label>Capacity:</label>
                <input placeholder="Capacity" type="number" name="capacity" value={screen.capacity} onChange={handleChange} required/>
                <label>Select Theatre:</label>
                <p>{screen.theatreId}</p>

                <button type="submit">Add Screen</button>

            </form>
        </section>
    );
};

export default ScreenForm;