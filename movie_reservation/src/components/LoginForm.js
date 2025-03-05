import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm=()=>{
    const [login,setLogin]=useState(
        {
            email:"",
            password:""
        }
    )
    const navigate=useNavigate();
    const [message, setMessage]=useState("");
    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{
            const response=await fetch(`${process.env.REACT_APP_BASE_API_URL}/login/`,
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(login),
                });
                if (response.ok){
                    setMessage("Logged in added successfully!");
                    setLogin({
                        email:"",
                        password:""
                    });
                    console.log(message)
                    const data=await response.json();
                    const userData = {
                        user_id: data.user_id,
                        email: data.email,
                        role: data.role,
                        access: data.access,
                        refresh: data.refresh,
                    };
                    localStorage.setItem('user',JSON.stringify(userData));
                    if (data.role===3){
                        navigate("/");
                    }
                    else{
                        navigate("/enterprise/");
                    }
                }
                else{
                    setMessage("Error logging in. Please try again.");
                }
                }catch(error){
                    setMessage("Server error. Please check your backend");
                }
    };
    

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setLogin({...login,[name]:value});
    };

    const handleOAuth= ()=>{
        const GOOGLE_OAUTH_URL='https://accounts.google.com/o/oauth2/v2/auth';
        const REDIRECT_URI='oauth2-login/';
        const scope=[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
        ].join(' ');
        const params={
            response_type:'code',
            client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
            redirect_uri: `${process.env.REACT_APP_BASE_API_URL}/${REDIRECT_URI}`,
            prompt: 'select_account',
            access_type:'offline',
            scope
        };
        const urlParams= new URLSearchParams(params).toString();
        window.location=`${GOOGLE_OAUTH_URL}?${urlParams}`;
    };
    const handleRegister=(event)=>{
        navigate("/register/")
    };

    return (
        <form className="form">
        <div className="title">Welcome,<br/><span>sign up to continue</span></div>
        <input type="email" placeholder="Email" name="email" value={login.email} className="input" onChange={handleChange}/>
        <input type="password" placeholder="Password" name="password" value={login.password} className="input" onChange={handleChange}/>
        <div className="login-with">
            <button type="button" className="button-log" onClick={handleOAuth}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 488 512" className="icon">
                <path 
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8
                 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5
                  69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" >
                </path>  
                </svg>
            </button>
        </div>
        <button className="button-confirm" onClick={handleSubmit}>Let`s go →</button>
        <span className="registerspan">New here?</span>
        <button className="button-register" onClick={handleRegister}>Register</button>
        </form>
    );
};

export default LoginForm;