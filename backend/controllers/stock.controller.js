// backend/controllers/stock.controller.js

const Product = require('../models/Product.model');
const StockItem = require('../models/StockItem.model');

exports.addStockItem = async (req, res) => {
    try {
        const {
            productName,
            productType,
            productMeasure,
            productPotency,
            productBrand,
            productQuantity,
            productPrice,
            productExpiry,
        } = req.body;

        // --- Data Formatting ---
        const name = productName.toUpperCase().trim();
        const type = productType.toUpperCase().trim();
        const brand = productBrand.toUpperCase().trim();

        // 1. Find or Create the Generic Product
        const productQuery = { name, type };
        if (productMeasure) productQuery.measure = productMeasure.toUpperCase().trim();
        if (productPotency) productQuery.potency = productPotency.toUpperCase().trim();
        
        const product = await Product.findOneAndUpdate(
            productQuery,
            { $setOnInsert: productQuery },
            { upsert: true, new: true, runValidators: true }
        );

        // 2. Build the Stock Item object conditionally
        const newStockItemData = {
            productId: product._id,
            brand: brand,
            quantity: productQuantity,
            salePrice: productPrice,
            // Add optional fields only if they exist
        };
        if (productExpiry) {
            newStockItemData.expiryDate = new Date(productExpiry);
        }

        const newStockItem = new StockItem(newStockItemData);
        await newStockItem.save();

        res.status(201).json({
            success: true,
            message: `Successfully added stock for ${brand} ${name}.`,
            data: newStockItem,
        });

    } catch (error) {
        console.error('Error adding stock item:', error);
        res.status(500).json({ success: false, message: 'Server error while adding stock.' });
    }
};


exports.getAllStockItems = async (req, res) => {
    try {
        // Find all documents in the StockItem collection
        const stockItems = await StockItem.find({})
            // Also fetch the linked product details (name, type, etc.)
            .populate('productId'); 

        res.status(200).json({
            success: true,
            items: stockItems, // Send the array of items back to the frontend
        });
    } catch (error) {
        console.error('Error fetching stock items:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};