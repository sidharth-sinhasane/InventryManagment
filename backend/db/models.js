const mongoose = require('mongoose');
require("dotenv").config();
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
        
    },
    list:[
        {company: String, price: Number}
    ]
    });
const todaySalesSchema = new mongoose.Schema({
    rfid: {
        type: Number,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
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

const userData = new mongoose.Schema({
    username: {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    list:[
        {name: String, quantity: Number, price: Number}
            ],
            
    email : {
        type : String,
        required : true,
    },
    contact : {
        type : Number,
        required : true,
    }
});

    const connectToDatabase = async function (){
        try{
            await mongoose.connect("mongodb+srv://admin123:admin123@cluster0.ggizw.mongodb.net/")
            console.log("connected to database")
        }
        catch(error){
            console.log("connection failed",error)
            process.exit(1)
        }
    }
const Inventry = mongoose.model('Inventry', inventrySchema);
const Location = mongoose.model('Location', locationSchema);    
const Pricing = mongoose.model('Pricing', pricingSchema);
const TodaySales = mongoose.model('TodaySales', todaySalesSchema);
const User = mongoose.model('User', userData);
module.exports = {Inventry,Location,Pricing,TodaySales,User,connectToDatabase};