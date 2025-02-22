const express = require('express');
const LocationRouter=express.Router();
const {Location}=require('../db/models');

LocationRouter.get('/',async (req,res)=>{
    res.send({message:"inside location router"});
});

module.exports={LocationRouter};