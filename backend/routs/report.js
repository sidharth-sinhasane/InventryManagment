const express = require('express');
const todayreportRouter=express.Router();
const {TodaySales}=require('../db/models');
const {Pricing}=require('../db/models');
const findMinprice = async (rfid)=>{
    try {
        
    } catch (error) {
        
    }
}
todayreportRouter.get('/',async (req,res)=>{
    try {
        const todaySales = await TodaySales.find({});
        res.json(todaySales);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sales' });
    }
});
module.exports={todayreportRouter};