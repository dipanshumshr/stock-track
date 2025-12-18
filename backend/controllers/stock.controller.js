// backend/controllers/stock.controller.js

const Product = require('../models/Product.model');
const StockItem = require('../models/StockItem.model');

// --- 1. ADD STOCK (With Merge Logic) ---
exports.addStockItem = async (req, res) => {
    try {
        const {
            productName,
            productType,
            productMeasure,
            productPotency,
            productBrand,
            productQuantity,
            productPrice,         // Sale Price
            productPurchasePrice, // Buying Price
            productExpiry,
        } = req.body;

        // A. Standardize Inputs
        const name = productName.toUpperCase().trim();
        const type = productType.toUpperCase().trim();
        const brand = productBrand.toUpperCase().trim();
        const measure = productMeasure ? productMeasure.toUpperCase().trim() : null;
        const potency = productPotency ? productPotency.toUpperCase().trim() : null;

        // B. Find or Create Generic Product (Name + Type)
        const productQuery = { name, type };
        const product = await Product.findOneAndUpdate(
            productQuery,
            { $setOnInsert: productQuery },
            { upsert: true, new: true, runValidators: true }
        );

        // C. Find if this EXACT Stock Item already exists
        // We match: ProductID + Brand + Potency + Measure
        const stockQuery = {
            productId: product._id,
            brand: brand,
            potency: potency,
            measure: measure
        };

        // D. Update or Insert
        const stockItem = await StockItem.findOne(stockQuery);

        if (stockItem) {
            // SCENARIO 1: Item exists -> Merge it!
            stockItem.quantity += parseInt(productQuantity); // Add new quantity to old
            stockItem.salePrice = productPrice; // Update to latest price
            
            // Optional: Update expiry if provided
            if (productExpiry) stockItem.expiryDate = new Date(productExpiry);
            
            await stockItem.save();

            res.status(200).json({
                success: true,
                message: `Updated stock for ${brand} ${name}. New Qty: ${stockItem.quantity}`,
                data: stockItem,
            });
        } else {
            // SCENARIO 2: Item does not exist -> Create new!
            const newStockItemData = {
                ...stockQuery, // Inherit IDs and attributes from query above
                quantity: productQuantity,
                salePrice: productPrice,
                purchasePrice: productPurchasePrice || 0,
            };

            if (productExpiry) {
                newStockItemData.expiryDate = new Date(productExpiry);
            }

            const newStockItem = new StockItem(newStockItemData);
            await newStockItem.save();

            res.status(201).json({
                success: true,
                message: `Created new stock for ${brand} ${name}.`,
                data: newStockItem,
            });
        }

    } catch (error) {
        console.error('Error adding stock item:', error);
        res.status(500).json({ success: false, message: 'Server error while adding stock.' });
    }
};


// --- 2. GET ALL STOCK (With Search, Sort & Pagination) ---
exports.getAllStockItems = async (req, res) => {
    try {
        // A. Pagination & Sort Params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const sortBy = req.query.sort || 'date'; 
        const sortOrder = req.query.order === 'asc' ? 1 : -1;
        
        // B. Search Param
        const search = req.query.search || "";

        // C. Build Sort Stage
        let sortStage = {};
        if (sortBy === 'name') {
            sortStage = { 'productDetails.name': sortOrder };
        } else {
            sortStage = { 'updatedAt': sortOrder };
        }

        // D. Build Match (Search) Stage
        let matchStage = {};
        if (search) {
            matchStage = {
                $or: [
                    { "productDetails.name": { $regex: search, $options: "i" } },
                    { "brand": { $regex: search, $options: "i" } }
                ]
            };
        }

        // E. Aggregation Pipeline
        const result = await StockItem.aggregate([
            // Join
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            // Unwind
            { $unwind: '$productDetails' },
            // Search Filter
            { $match: matchStage },
            // Sort
            { $sort: sortStage },
            // Pagination & Count
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        { $addFields: { productId: "$productDetails" } },
                        { $project: { productDetails: 0 } }
                    ],
                    metadata: [ { $count: "total" } ]
                }
            }
        ]);

        const stockItems = result[0].data;
        const totalItems = result[0].metadata[0] ? result[0].metadata[0].total : 0;

        res.status(200).json({
            success: true,
            items: stockItems,
            pagination: {
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                itemsPerPage: limit
            }
        });

    } catch (error) {
        console.error('Error fetching stock items:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};