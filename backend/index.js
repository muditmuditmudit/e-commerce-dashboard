const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");

const Jwt = require('jsonwebtoken');
//const jwtKey = 'e-comm';

app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
    let user = new User(req.body);
    let result  = await user.save();
    result = result.toObject();
    delete result.password;

    Jwt.sign({result},process.env.jwtKey,{expiresIn:"2hr"},(err,token)=>{
        if(err){
            resp.send({result:"something went wrond..."});
        }else{
            resp.send({result,auth:token});
        }
    })
});

app.post("/login",async (req,resp)=>{
    if(req.body.email && req.body.password){
        let user  = await User.findOne(req.body).select("-password");
        if(user){
            Jwt.sign({user},process.env.jwtKey,{expiresIn:"2hr"},(err,token)=>{
                if(err){
                    resp.send({result:"something went wrong..."});
                }else{
                    resp.send({user,auth:token});
                }
            })
        }else{
            resp.send({result:"No user found"});
        }
    }else{
        resp.send({result:'User not found'});
    }
});

app.post("/add-product",varifyToken,async (req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products",varifyToken,async (req,resp)=>{
    let products = await Product.find();
    if(products.length > 0){
        resp.send(products);
    }else{
        resp.send({result:"No result found"});
    }
})

app.delete("/product-del/:id",varifyToken,async (req,resp)=>{
    const id = req.params.id;
    const result = await Product.deleteOne({_id:id});
    resp.send(result);

})

app.get("/product-del/:id",varifyToken,async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No record found"});
    }
})

app.put("/product-del/:id",varifyToken,async (req,resp)=>{
    let result  = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result);
});

app.get("/search/:key",varifyToken,async (req,resp)=>{
    let result  = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
    resp.send(result);
});

function varifyToken(req,resp,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token,process.env.jwtKey, (err,valid)=>{
            if(err){
                resp.status(401).send({result:"Please enter valid token"});
            }else{
                next();
            }
        })
    }else{
        resp.status(404).send({result:"Please add a valid token"});
    }
}

app.listen(5000);