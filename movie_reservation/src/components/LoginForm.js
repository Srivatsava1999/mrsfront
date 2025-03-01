import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "./DropdownComponent";

const LoginForm=()=>{
    const [login,setLogin]=useState(
        {
            email:"",
            password:"",
            role: 3
        }
    )
    // role #3 - Customer, role #2 - Enterprise
    const roleOptions=[
        {roleName:"Customer", role: 3},
        {roleName:"Enterprise", role: 2}
    ];
    const navigate=useNavigate();
    const [message, setMessage]=useState("");
    const handleSubmit= async(event)=>{
        event.preventDefault();

        try{
            const response=await fetch("http://127.0.0.1:8000/login/",
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(login),
                });
                if (response.ok){
                    setMessage("Logged in added successfully!");
                    setLogin({
                        email:"",
                        password:"",
                        role: 3
                    });
                    const data=await response.json();
                    localStorage.setItem('user',data);
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
            redirect_uri: `${process.env.REACT_APP_BASE_API_URL}?${REDIRECT_URI}`,
            prompt: 'select_account',
            access_type:'offline',
            scope
        };
        const urlParams= new URLSearchParams(params).toString();
        window.location=`${GOOGLE_OAUTH_URL}?${urlParams}`;
    };

    return (
        <form className="form">
        <div className="title">Welcome,<br/><span>sign up to continue</span></div>
        {message && <p>{message}</p>}
        <input type="email" placeholder="Email" name="email" value={login.email} className="input" onChange={handleChange}/>
        <input type="password" placeholder="Password" name="password" value={login.password} className="input" onChange={{handleChange}}/>
        <div className="login-with">
            <button className="button-log" onClick={handleOAuth}>
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="56.693px" 
            viewBox="0 0 56.693 56.693" version="1.1" id="Layer_1" height="56.693px" className="icon"><path d="M40.43,21.739h-7.645v-5.014c0-1.883,1.248-2.322,2.127-2.322c0.877,0,5.395,0,5.395,0V6.125l-7.43-0.029  c-8.248,0-10.125,6.174-10.125,10.125v5.518h-4.77v8.53h4.77c0,10.947,0,24.137,0,24.137h10.033c0,0,0-13.32,0-24.137h6.77  L40.43,21.739z"></path></svg>
            </button>
            <DropdownComponent
            options={roleOptions}
            labelKey="roleName"
            valueKey="role"
            onChange={(value) => handleChange({ target: { name: "role", value } })}
            className="input"/>
        </div>
        <button className="button-confirm" onClick={handleSubmit}>Let`s go →</button>
        <div classNameName="separator">
            <div></div>
            <span>OR</span>
            <div></div>
        </div>
        <span>New here?</span>
        <button className="button-confirm" onClick={navigate("/register/")}>Register</button>
        </form>
    );
};

export default LoginForm;