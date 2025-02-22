const express = require('express');
const purchaseRouter=express.Router();
const {Inventry,TodaySales}=require('../db/models');

purchaseRouter.get('/',async (req,res)=>{
    res.send({message:"inside purchase router"});
});

purchaseRouter.put('/changeInventry',async (req,res)=>{
    const listOfQuantity=req.body;
    try{
        for(let i=0;i<listOfQuantity.length;i++){
            const item=await Inventry.findOne({rfid:listOfQuantity[i].rfid});
            item.quantity-=listOfQuantity[i].quantity;
            await item.save();
        }
        res.status(200).send({message:"quantity updated successfully"});
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }
})
purchaseRouter.post('/addtoSales',async (req,res)=>{
    const listOfQuantity=req.body;
    try{
        for(let i=0;i<listOfQuantity.length;i++){
            const {rfid,quantity,price}=listOfQuantity[i];
            const newSales=await TodaySales.create({rfid,quantity,price});
            newSales.save();
        }
        res.send(newSales);
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }

});
module.exports={purchaseRouter};