const express = require('express');
const companypricesRouter=express.Router();
const {Pricing}=require('../db/models');
companypricesRouter.get('/',async (req,res)=>{
    try {
        const pricing = await Pricing.find({});
        res.json(pricing);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch prices' });
    }
});
companypricesRouter.get('/id', async (req, res) => {
    try {
        const pricing = await Pricing.find({rfid:req.body.id});
        res.json(pricing);
    } catch (error) { 
        res.status(500).json({ error: "Error fetching price" });
    }});
companypricesRouter.post('/',async (req,res)=>{
    try{
        const allPrices= req.body;
        for(let i=0;i<allPrices.length;i++){
            const pricing = new Pricing(allPrices[i]);
            await pricing.save();
        }
        res.status(200).send({message:"price added successfully"});
    }
    catch(error){
        console.log(error);
        res.send({message:"error occured",error:error});
    }
});
module.exports={companypricesRouter};