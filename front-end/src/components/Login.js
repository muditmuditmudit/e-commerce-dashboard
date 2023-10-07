import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {   
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    },[])
    const handleLogin =async () =>{
        console.warn(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method: 'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result  = await result.json();
        //console.warn(result);
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
        }
    }
    return(
        <div className='register-page'>
            <h2>Login here</h2>
            <input type = "text" onChange={(e)=>setEmail(e.target.value)} value={email} className = "inputBox" placeholder="Enter email"/>
            <input type = "text" onChange={(e)=>setPassword(e.target.value)} value={password} className = "inputBox" placeholder="Enter password"/>
            <button className="signup-button" onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;