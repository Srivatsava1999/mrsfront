import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";

const HandleLogout=()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const navigate=useNavigate();
    useEffect(()=>{
        logout();
    }, []);
    const logout=async()=>{
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
                console.log("Logged out added successfully!");
                navigate("/login/");
                const data= await response.json();
                    if (data.new_access_token){
                        user.access=data.new_access_token;
                        localStorage.setItem("user", JSON.stringify(user));
                    }
            }
            else{
                console.log("Client error");
            }
            }catch(error){
                console.log("Server error. Please check your backend");
            }
        };
        return (
            <div>

            </div>
        );
};
export default HandleLogout