const express = require('express');
const purchaseRouter=express.Router();
const {Inventry,TodaySales,User}=require('../db/models');

purchaseRouter.get('/',async (req,res)=>{
    res.send({message:"inside purchase router"});
});

const autoorder = async (rfid, currentquantity,Threshold) => {
    // route to auto order items if quantity is less than 10
    
}

purchaseRouter.put('/changeInventry',async (req,res)=>{
    // route to update quantity of items in inventory
    const listOfQuantity=req.body;
    try{
        for(let i=0;i<listOfQuantity.length;i++){
            const item=await Inventry.findOne({rfid:listOfQuantity[i].rfid});
            item.quantity-=listOfQuantity[i].quantity;
            // add function here
            await item.save();
        }
        res.status(200).send({message:"quantity updated successfully"});

    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }
})
purchaseRouter.post('/addtoSales',async (req,res)=>{
    // route to add sales data in todaysales table
    // route to add user data in user table
    const listOfQuantity=req.body;
    try{
        const salesPromises = listOfQuantity.list.map(({ rfid, quantity, price }) => 
            TodaySales.create({ rfid, quantity, price, date: new Date() })
        );
        await Promise.all(salesPromises);

        const { username, age, contact, email } = listOfQuantity;
        const list = listOfQuantity.list.map(({ name, quantity, price }) => ({ name, quantity, price }));

        await User.create({ username, age, email, contact, list });

        res.status(200).json({ message: "Sales added successfully" });
    }
    catch(error){
        console.log(error.message);
        res.send({error:error.message});
    }

});
module.exports={purchaseRouter};