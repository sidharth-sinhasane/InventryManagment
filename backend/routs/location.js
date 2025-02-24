const express = require('express');
const locationRouter=express.Router();
const {Location}=require('../db/models');

locationRouter.get('/',async (req,res)=>{  
    // route to get all locations
    try {
        const locations = await Location.find({});
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching locations" });
    }
});
locationRouter.post('/',async (req,res)=>{
    // rout to add data in location table
    try{
        const allLocations= req.body;
        for(let i=0;i<allLocations.length;i++){
            const location = new Location(allLocations[i]);
            await location.save();
        }
        res.status(200).send({message:"location added successfully"});
    }
    catch(error){
        console.log(error);
        res.send({message:"error occured",error:error});
    }
});

locationRouter.get('/id', async (req, res) => {
    // route to get a particular location
    try {
        const location = await Location.find({rfid:req.body.id});
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location" });
    }
});

module.exports={locationRouter};