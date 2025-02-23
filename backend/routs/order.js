const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const orderRouter = express.Router();
const { User } = require('../db/models'); 

orderRouter.get('/receipt', async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if (!user) return res.status(404).json({ error: "User not found" });

        const doc = new PDFDocument();
        const filename = `receipt_${user.username}.pdf`;
        const filePath = `./receipts/${filename}`;

 
        if (!fs.existsSync('./receipts')) {
            fs.mkdirSync('./receipts');
        }


        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(18).text("🏥 Medical Purchase Receipt 🏥", { align: "center" });
        doc.moveDown();

        doc.fontSize(12).text(`Name: ${user.username}`);
        doc.text(`Age: ${user.age}`);
        doc.text(`Contact: ${user.contact}`);
        doc.text(`Email: ${user.email}`);
        doc.moveDown();

        doc.text("Items Purchased:", { underline: true });
        doc.moveDown();

        let total = 0;

        for(let i=0;i<user.list.length;i++){
            doc.text(`${i+1}. ${user.list[i].name} - ${user.list[i].quantity} x $${user.list[i].price} = $${user.list[i].quantity * user.list[i].price}`);
            total += user.list[i].quantity * user.list[i].price;
        }

        doc.moveDown();
        doc.text(`Total Amount: $${total}`, { bold: true });

        doc.moveDown();
        doc.text("Thank you for your purchase!", { align: "center" });

        doc.end();


        stream.on('finish', () => {
            res.download(filePath, filename, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                    res.status(500).json({ error: "Error generating receipt" });
                }
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating receipt" });
    }
});

module.exports = { orderRouter };