import React, { useState,useEffect } from "react";
import "./ScreenForm.css";
function ScreenForm({theatreId}){
    const user=JSON.parse(localStorage.getItem("user"))
    const [screen,setScreen]=useState({
        screenNum:"",
        capacity:"",
        theatreId: theatreId
    });
    const [theatre, setTheatre]=useState("");
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_API_URL}/theatres/${screen.theatreId}/`,{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.access}`,
                "X-Refresh-Token": user.refresh,
                "X-User-Id": user.user_id
            },
        }).then(response => response.json()).then(data=>{
            const {new_access_token, ...theatreData}=data; 
            setTheatre(theatreData);
                if(new_access_token){
                    user.access=new_access_token;
                    localStorage.setItem("user", JSON.stringify(user));
                }
            })
        .catch(error=>console.error("Error fetching theatres", error));
    }, []);
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
            const response=await fetch(`${process.env.REACT_APP_BASE_API_URL}/theatre/${Number(screen.theatreId)}/screen/`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${user.access}`,
                        "X-Refresh-Token": user.refresh,
                        "X-User-Id": user.user_id
                    },
                    body: JSON.stringify(screen),
                });
                if (response.ok){
                    setMessage("Screen added successfully!");
                    setScreen({
                        screenNum:"",
                        capacity:"",
                        theatreId: theatreId
                    });
                    const data= await response.json();
                    if (data.new_access_token){
                        user.access=data.new_access_token;
                        localStorage.setItem("user", JSON.stringify(user));
                    }
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
            <h2>Add Screen</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Screen Number:</label>
                <input placeholder="Screen Number" type="text" name="screenNum" value={screen.screenNum} onChange={handleChange} required />
                <label>Capacity:</label>
                <input placeholder="Capacity" type="number" name="capacity" value={screen.capacity} onChange={handleChange} required/>
                <label>Selected Theatre:</label>
                <p>{theatre.theatreName}</p>

                <button type="submit" className="button-confirm">Add Screen</button>

            </form>
        </section>
    );
};

export default ScreenForm;