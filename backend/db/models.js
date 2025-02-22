const mongoose = require('mongoose');

const inventrySchema = new mongoose.Schema({
    rfid: {
        type: int,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: int,
        required: true
    },
    quantity: {
        type:int,
        required: true
    },
    expirty_date: {
        type: Date,
        required: true
    }
    });
const locationSchema = new mongoose.Schema({
    rfid: {
        type: int,
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
        type: int,
        required: true,
        unique: true,
        list:[
            {company: String, price: int}
        ]
    }
    });
const todaySalesSchema = new mongoose.Schema({
    rfid: {
        type: int,
        required: true,
        unique: true
    },
    quantity: {
        type: int,
        required: true,
    },
    price: {
        type: int,
        required : true
    }
    });
