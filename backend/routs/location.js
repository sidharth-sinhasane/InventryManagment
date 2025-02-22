const express = require('express');
const locationRouter=express.Router();
const {Location}=require('../db/models');

locationRouter.get("/", async (req, res) => {
    try {
        const locations = await Location.find({});
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching locations" });
    }
});



module.exports={locationRouter};