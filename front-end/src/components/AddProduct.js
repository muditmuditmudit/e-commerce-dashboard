import React, { useState } from 'react';
import { redirect } from 'react-router-dom';


const AddProduct = ()=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);

    const addProduct = async() =>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }        
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch("http://localhost:5000/add-product",{
            method:'post',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        //console.warn(result);
        if(result){
            
            const successAdd = document.getElementsByClassName("display");
            successAdd[0].innerHTML = "Product Added Successfully!";
            setTimeout(()=>{
                window.location.reload();
            },2500);
        }
    }

    return (
        <div>
            <div className="register-page">
                <input type="text" placeholder='Enter product name' className='inputBox' onChange ={(e)=>setName(e.target.value)}
                value = {name} />
                {error && !name && <span className="error-value">Please enter a valid name</span>}
                <input type="text" placeholder='Enter product price' className='inputBox' onChange ={(e)=>setPrice(e.target.value)}
                value = {price} />
                {error && !price && <span className="error-value">Please enter a valid price</span>}
                <input type="text" placeholder='Enter product category' className='inputBox' onChange ={(e)=>setCategory(e.target.value)}
                value = {category} />
                {error && !category && <span className="error-value">Please enter a valid category</span>}
                <input type="text" placeholder='Enter product company' className='inputBox' onChange ={(e)=>setCompany(e.target.value)}
                value = {company} />
                {error && !company && <div className="error-value">Please enter a valid company name</div>}
                <button className="signup-button" onClick={addProduct} >Add Product</button>
            </div>
            <div className ="display"></div>
            <div className = "blank-space"></div>
        </div>
        
    )
}

export default AddProduct;