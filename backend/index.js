const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const {Inventry, Location, Pricing, TodaySales,connectToDatabase} = require('./db/models');
const {inventryRouter} = require('./routs/inventry.js');
const {locationRouter} = require('./routs/location.js');
const {purchaseRouter} = require('./routs/purchase.js');
const { orderRouter } = require('./routs/order.js');
connectToDatabase();
app.use(express.json());

app.use('/order', orderRouter);
app.use('/inventry', inventryRouter);
app.use('/location', locationRouter);
app.use('/purchase', purchaseRouter);

app.listen(3000, () => {
    console.log("server started at port 3000");
});