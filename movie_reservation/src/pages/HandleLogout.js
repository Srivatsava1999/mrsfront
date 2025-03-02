import React from "react";
import { useNavigate } from "react-router-dom";

const HandleLogout=async()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const navigate=useNavigate();
    try{
        const requestBody={refresh: user.refresh,owner: user.user_id};
        const response=await fetch("http://127.0.0.1:8000/logout/",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.access}`
                },
                body: JSON.stringify(requestBody),
            });
            if (response.ok){
                console.log("Movie added successfully!");
                navigate("/login/");
            }
            else{
                console.log("Client error");
            }
            }catch(error){
                console.log("Server error. Please check your backend");
            }
        return
};
export default HandleLogout