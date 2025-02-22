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
        list: [
            {
                company: { type: String, required: true },
                price: { type: Number, required: true }
            }
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
