const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const orderRouter = express.Router();
const { UserInfo, TodaySales } = require('../db/models');

orderRouter.get('/receipt', async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const doc = new PDFDocument();
        const filename = `receipt_${user.username}.pdf`;
        const filePath = `./receipts/${filename}`;

        if (!fs.existsSync('./receipts')) fs.mkdirSync('./receipts');

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

        user.list.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.name} - ${item.quantity} x $${item.price} = $${item.quantity * item.price}`);
            total += item.quantity * item.price;
        });

        doc.moveDown();
        doc.text(`Total Amount: $${total}`, { bold: true });
        doc.moveDown();
        doc.text("Thank you for your purchase!", { align: "center" });

        doc.end();

        stream.on('finish', () => {
            res.download(filePath, filename, (err) => {
                if (err) res.status(500).json({ error: "Error generating receipt" });
            });
        });

    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ error: error.message || "Error generating receipt" });
    }
});

module.exports = { orderRouter };
