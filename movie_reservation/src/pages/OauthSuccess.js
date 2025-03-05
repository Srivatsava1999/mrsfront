import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const OauthSuccess=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        const queryParams=new URLSearchParams(location.search)
        const refresh=queryParams.get("refresh");
        const access=queryParams.get("access");
        const user_id=queryParams.get("user_id");
        const email=queryParams.get("email");
        const role=queryParams.get("role");
        const user={
            "refresh": refresh,
            "access": access,
            "user_id": user_id,
            "email": email,
            "role": role
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate('/');
    }, []);
    return (
        <div>Logging you in...</div>
    );
};

export default OauthSuccess;