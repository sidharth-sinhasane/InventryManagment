const express = require('express');
const purchaseRouter=express.Router();
const {Inventry,TodaySales}=require('../db/models');

purchaseRouter.get('/',async (req,res)=>{
    res.send({message:"inside purchase router"});
});

purchaseRouter.put('/changeInventry',async (req,res)=>{
    res.send({message:"inside changeInventry router"});
})
purchaseRouter.post('/addtoSales',async (req,res)=>{
    res.send({message:"inside addSales router"});
});
module.exports={purchaseRouter};