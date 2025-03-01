const mongoose = require('mongoose');
require("dotenv").config({path: '../.env'});
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
    },
    Threshold: {
        type : Number,
        required : true,
        default : 100
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
    },
    
});


const companyMail = new mongoose.Schema({
    company: {
        type: String,
        required: true
        },
    companyemail : {
        type : String,
        required : true,
    },
});


inventrySchema.virtual("stock_deficiency").get(function () {
    return Math.max(this.threshold - this.quantity, 0);
});



    const connectToDatabase = async function (){
        try{
            await mongoose.connect(process.env.MONGODB_URL);
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
const Gmail = mongoose.model('Gmail', companyMail);

module.exports = {Inventry,Location,Pricing,TodaySales,User,Gmail,connectToDatabase};