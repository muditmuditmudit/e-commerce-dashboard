import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const ProductList = () =>{
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async() =>{
        
        let result  = await fetch("http://localhost:5000/products",{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
        console.warn(result);
    }
    //console.warn("Showing product",products);

    const deleteProduct = async (id) =>{
        let result  = await fetch(`http://localhost:5000/product-del/${id}`,{
            method: 'delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result  = await result.json();
        if(result){
            window.location.reload();
        }
    }

    const searchHandle = async (e) =>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
    }

    return(
        <div className ="product-list">
            <h3 className='product-search-box'>Products List</h3>
            <input type = "text" className='product-search-box' placeholder="Search Product"
            onChange = {searchHandle} ></input>
            <table>
            <tr>
                <th>S. No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Operation</th>
            </tr>
            {
                products.length > 0 ? products.map((item,index)=>
                    <tr key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td><button onClick = {()=>deleteProduct(item._id)} >Delete</button>
                        <Link to = {`/update/${item._id}`} >Update</Link></td>
                    </tr>
                )
                : <h3>No result found</h3>
            }
            </table>
        </div>
    )
}

export default ProductList;