const express = require('express');
const inventryRouter=express.Router();
const {Inventry}=require('../db/models');

inventryRouter.get('/',async (req,res)=>{
    res.send({message:"inside inventry router"});
});
inventryRouter.get('/id',async (req,res)=>{
   
    res.send({message:"inside inventry id router"});
});
module.exports={inventryRouter};