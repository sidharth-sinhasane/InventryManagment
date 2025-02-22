const mongoose = require('mongoose');
require('dotenv').config()
console.log(process.env.name)
const inventrySchema = new mongoose.Schema({
    rfid: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type:Number,
        required: true
    },
    expirty_date: {
        type: Date,
        required: true
    }
    });
const locationSchema = new mongoose.Schema({
    rfid: {
        type: Number,
        required: true,
        unique: true
    },
    section : {
        type: String,
        required: true
    }
    });
const pricingSchema = new mongoose.Schema({
    rfid: {
        type: Number,
        required: true,
        unique: true,
        list:[
            {company: String, price: Number}
        ]
    }
    });
const todaySalesSchema = new mongoose.Schema({
    rfid: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required : true
    }
    });
    const connectToDatabase = async function (){
        try{
            await mongoose.connect(process.env.MONGODB_URL)
            console.log("connected to database")
        }
        catch(error){
            console.log("connection failed",error)
            process.exit(1)
        }
    }
    // connectToDatabase()