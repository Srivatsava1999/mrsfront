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
            console.log(user.refresh)
        const response=await fetch("http://127.0.0.1:8000/logout/",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${user.access}`,
                    "X-Refresh-Token": user.refresh,
                    "X-User-Id": user.user_id
                },
                body: JSON.stringify(localStorage.getItem("user")),
            });
            const data=await response.json()
            const {new_access_tokens, ...rest}=data
            if (response.ok){
                console.log("Logged out added successfully!");
                if (new_access_tokens){
                    user.access=new_access_tokens
                    localStorage.setItem("user", JSON.stringify(user))
                }
                navigate("/login/");
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