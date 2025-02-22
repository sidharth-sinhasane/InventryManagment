const express = require('express');
const LocationRouter=express.Router();
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

module.exports={locationRouter};