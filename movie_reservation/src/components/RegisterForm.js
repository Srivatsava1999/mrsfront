import React, { useCallback, useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import DropdownComponent from "./DropdownComponent";

const RegisterForm=()=>{
    const [register,setRegister]=useState(
        {
            email:"",
            password:"",
            role: 3,
            name:"",
            phone:""
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
            const response=await fetch(`${process.env.REACT_APP_BASE_API_URL}/register/`,
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json",},
                    body: JSON.stringify(register),
                });
                if (response.ok){
                    setMessage("Registered successfully!");
                    setRegister({
                        email:"",
                        password:"",
                        role: 3,
                        name:"",
                        phone:""
                    });
                    const data=await response.json();
                    localStorage.setItem('user',JSON.stringify(data));
                    if (data.role===3){
                        navigate("/");
                    }
                    else{
                        navigate("/enterprise/");
                    }
                }
                else{
                    setMessage("Error Registering. Please try again.");
                }
                }catch(error){
                    setMessage("Server error. Please check your backend");
                }
    };

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setRegister({...register,[name]:value});
    };

    const handleOAuth= ()=>{
        const GOOGLE_OAUTH_URL='https://accounts.google.com/o/oauth2/v2/auth';
        const REDIRECT_URI='oauth2-register/';
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
    const handleLogin=(event)=>{
        navigate("/login/")
    };

    return (
        <form className="form">
        <div className="title">Welcome,<br/><span>sign up to continue</span></div>
        {message && <p>{message}</p>}
        <input type="email" placeholder="Email" name="email" value={register.email} className="input" onChange={handleChange}/>
        <input type="password" placeholder="Password" name="password" value={register.password} className="input" onChange={handleChange}/>
        <input type="text" placeholder="Name" name="name" value={register.name} className="input" onChange={handleChange}/>
        <input type="text" placeholder="Phone" name="phone" value={register.phone} className="input" onChange={handleChange}/>
        <DropdownComponent
            options={roleOptions}
            labelKey="roleName"
            valueKey="role"
            onChange={(value) => setRegister({...register,role:value})}
            className="input"/>
        <div className="register-with">
            <button className="button-log" onClick={handleOAuth}>
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
        <span className="registerspan">Already have an account</span>
        <button className="button-login" onClick={handleLogin}>Log In</button>
        </form>
    );
};

export default RegisterForm;