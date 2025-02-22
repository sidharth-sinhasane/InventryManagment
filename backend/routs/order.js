const express = require('express');
const ordrRouter=express.Router();
const {Pricing}=require('../db/models');

ordrRouter.get('/',async (req,res)=>{
    const bill = req.body;
    try{
        
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }
});