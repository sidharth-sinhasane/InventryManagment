const express = require('express');
const inventryRouter=express.Router();
const {Inventry}=require('../db/models');

inventryRouter.get('/',async (req,res)=>{
    try {
        const inventoryItem = await Inventry.find({});
        res.json(inventoryItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});
inventryRouter.get('/id',async (req,res)=>{
    inventryRouter.get('/:id', async (req, res) => {
        try {
            const inventoryItem = await Inventry.findBy(req.body.id);
            res.json(inventoryItem);
        } catch (error) {
            res.status(500).json({ error: "Error fetching inventory item" });
        }
    });
});

inventryRouter.post('/',async (req,res)=>{
    try{
        const allInventry= req.body;
        for(let i=0;i<allInventry.length;i++){
            const inventry = new Inventry(allInventry[i]);
            await inventry.save();
        }
        res.status(200).send({message:"inventry added successfully"});
    }
    catch(error){
        console.log(error);
        res.send({message:"error occured",error:error});
    }
});
module.exports={inventryRouter};