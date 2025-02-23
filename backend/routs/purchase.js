const express = require('express');
const purchaseRouter=express.Router();
const {Inventry,TodaySales,User,Pricing}=require('../db/models');

purchaseRouter.get('/',async (req,res)=>{
    minprice(1017);
    res.send({message:"inside purchase router"});
});
const minprice = async (rfid) => {
    // route to find minimum price of an item
    try {
        const pricing = await Pricing.findOne({ rfid });
        if (!pricing) throw new Error("Item not found in pricing list");
        const minPriceEntry = pricing.list.reduce((min, item) => item.price < min.price ? item : min, pricing.list[0]);
        console.log(minPriceEntry.price,minPriceEntry.company);
        return { company: minPriceEntry.company, price: minPriceEntry.price };
        
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
const autoorder = async () => {
    const items = await Inventry.find();
    const orders = {};

    for (const item of items) {
        if (item.quantity < item.threshold) {
            const { company, price } = await minprice(item.rfid);
            const quantity = item.threshold - item.quantity;

            if (!orders[company]) {
                orders[company] = [];
            }
            
            orders[company].push({ rfid: item.rfid, price, quantity });
        }
    }

    return orders;
};


purchaseRouter.put('/changeInventry',async (req,res)=>{
    // route to update quantity of items in inventory
    const listOfQuantity=req.body;
    try{
       
        for(let i=0;i<listOfQuantity.length;i++){
            const item=await Inventry.findOne({rfid:listOfQuantity[i].rfid});
            item.quantity-=listOfQuantity[i].quantity;
            
            await item.save();
        }
        // add function here
        console.log(autoorder());
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