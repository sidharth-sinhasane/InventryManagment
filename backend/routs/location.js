const express = require('express');
const locationRouter=express.Router();
const {Location}=require('../db/models');

locationRouter.get('/',async (req,res)=>{
    try {
        const locations = await Location.find({}); // Wait for the query to resolve
        res.json(locations); // Send the actual array, not a Promise
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

module.exports={locationRouter};