const express = require('express');
const purchaseRouter=express.Router();
const {Inventry,TodaySales}=require('../db/models');

purchaseRouter.get('/',async (req,res)=>{
    res.send({message:"inside purchase router"});
});

purchaseRouter.put('/changeInventry',async (req,res)=>{
    const {rfid,quantity}=req.body;
    try{
        const item=await Inventry.findOne({rfid:rfid});
        item.quantity-=quantity;
        await item.save();
        res.send(item);
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }
})
purchaseRouter.post('/addtoSales',async (req,res)=>{
    const {rfid,quantity,price}=req.body;
    try{
        const newSales=await TodaySales.create({rfid,quantity,price});
        res.send(newSales);
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }

});
module.exports={purchaseRouter};