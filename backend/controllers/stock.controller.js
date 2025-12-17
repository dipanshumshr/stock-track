// backend/controllers/stock.controller.js

const Product = require('../models/Product.model');
const StockItem = require('../models/StockItem.model');

// --- 1. ADD STOCK ITEM ---
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
            productPurchasePrice,
            productExpiry,
        } = req.body;

        // --- Data Formatting ---
        const name = productName.toUpperCase().trim();
        const type = productType.toUpperCase().trim();
        const brand = productBrand.toUpperCase().trim();

        // 1. Find or Create the Generic Product (Name + Type only)
        const productQuery = { name, type };
        
        const product = await Product.findOneAndUpdate(
            productQuery,
            { $setOnInsert: productQuery },
            { upsert: true, new: true, runValidators: true }
        );

        // 2. Build the Stock Item object
        const newStockItemData = {
            productId: product._id,
            brand: brand,
            quantity: productQuantity,
            salePrice: productPrice,
            purchasePrice: productPurchasePrice || 0,
            measure: productMeasure ? productMeasure.toUpperCase().trim() : null,
            potency: productPotency ? productPotency.toUpperCase().trim() : null,
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


// --- 2. GET ALL STOCK ITEMS (With Pagination & Sorting) ---
exports.getAllStockItems = async (req, res) => {
    try {
        // A. Pagination Params (Default: Page 1, 10 items)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // B. Sorting Params
        const sortBy = req.query.sort || 'date'; 
        const sortOrder = req.query.order === 'asc' ? 1 : -1;

        // Determine sort stage
        let sortStage = {};
        if (sortBy === 'name') {
            sortStage = { 'productDetails.name': sortOrder }; // Sort by joined Product Name
        } else {
            sortStage = { 'updatedAt': sortOrder }; // Default: Sort by Date
        }

        // C. Aggregation Pipeline
        const result = await StockItem.aggregate([
            // 1. Join with Products to get the Name
            {
                $lookup: {
                    from: 'products',       // Must match DB collection name (lowercase plural)
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            
            // 2. Unwind array to access fields
            { $unwind: '$productDetails' },

            // 3. Apply Sorting
            { $sort: sortStage },

            // 4. Get Data + Count (in parallel using facet)
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        // Reshape to match standard .populate() output
                        { 
                            $addFields: { productId: "$productDetails" } 
                        },
                        { $project: { productDetails: 0 } }
                    ],
                    metadata: [ { $count: "total" } ]
                }
            }
        ]);

        // D. Extract data safely
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