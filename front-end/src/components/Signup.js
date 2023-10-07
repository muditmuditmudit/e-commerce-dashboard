import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = ()=>{
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();



    useEffect(()=>{
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            collectData();
        }
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    },[formErrors]);


    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate({name,email,password}));
      setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
          errors.name = "Username is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      };

    const collectData = async() =>{
        console.warn(name,email,password);
        let result = await fetch('http://localhost:5000/register',{
            method: 'post',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        if(result){
            navigate('/');
        }
    }

    return(
       <div className="register-page">
        <h2 >Register here</h2>
        <input className = "inputBox" type= "text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
        <p style={{color:'red'}}>{formErrors.name}</p>
        <input className = "inputBox" type= "text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
        <p style={{color:'red'}}>{formErrors.email}</p>
        <input className = "inputBox" type= "password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" />
        <p style={{color:'red'}}>{formErrors.password}</p>
        <button onClick={handleSubmit} className="signup-button" type="button">Signup</button>

       </div>
    );
}

export default Signup;

