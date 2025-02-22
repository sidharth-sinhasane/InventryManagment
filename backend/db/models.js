const mongoose = require('mongoose');

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
            {company: String, price: int}
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
            await mongoose.connect("mongodb+srv://admin123:admin123@cluster0.ggizw.mongodb.net/")
            console.log("connected to database")
        }
        catch(error){
            console.log("connection failed",error)
            process.exit(1)
        }
    }
connectToDatabase()
const Inventry = mongoose.model('Inventry', inventrySchema);
const Location = mongoose.model('Location', locationSchema);    
const Pricing = mongoose.model('Pricing', pricingSchema);
const TodaySales = mongoose.model('TodaySales', todaySalesSchema);
module.exports = {Inventry,Location,Pricing,TodaySales,connectToDatabase};