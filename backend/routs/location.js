const express = require('express');
const locationRouter=express.Router();
const {Location}=require('../db/models');

locationRouter.get("/", async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: "Error fetching locations" });
    }
});

locationRouter.get("/id", async (req, res) => {
    try {
        const Section = await location.findByPk(req.body.id);
    } catch (error) {
        res.status(500).json({ error: "Error fetching location" });
    }
});

=======
locationRouter.get('/',async (req,res)=>{
    try {
        const locations = await Location.find({}); // Wait for the query to resolve
        res.json(locations); // Send the actual array, not a Promise
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

>>>>>>> 706a41ff22c15c1fe04c12c5dbdcdcb367d2dfb7
module.exports={locationRouter};