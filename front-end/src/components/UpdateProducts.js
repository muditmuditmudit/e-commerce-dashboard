import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


const UpdateProducts = ()=>{
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetail();
    },[]);

    const getProductDetail = async() =>{
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product-del/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () =>{
        let result = await fetch (`http://localhost:5000/product-del/${params.id}`,{
            method :"put",
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        console.warn(result);
        navigate("/");
    }
    return (
        <div>
            <div className="register-page">
                <input type="text" placeholder='Enter product name' className='inputBox' onChange ={(e)=>setName(e.target.value)}
                value = {name} />
                
                <input type="text" placeholder='Enter product price' className='inputBox' onChange ={(e)=>setPrice(e.target.value)}
                value = {price} />
                
                <input type="text" placeholder='Enter product category' className='inputBox' onChange ={(e)=>setCategory(e.target.value)}
                value = {category} />

                <input type="text" placeholder='Enter product company' className='inputBox' onChange ={(e)=>setCompany(e.target.value)}
                value = {company} />
                
                <button className="signup-button" onClick={updateProduct} >Update Product</button>
            </div>
            <div className ="display"></div>
            <div className = "blank-space"></div>
        </div>
        
    )
}

export default UpdateProducts;