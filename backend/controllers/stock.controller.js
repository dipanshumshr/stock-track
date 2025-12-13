exports.getAllStockItems = async (req, res) => {
    try {
        // 1. Pagination Params (Default: Page 1, 10 items)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // 2. Sorting Params
        // Sort by 'name' (A-Z) or 'date' (Updated Time)
        // Order: 'asc' (1) or 'desc' (-1)
        const sortBy = req.query.sort || 'date'; 
        const sortOrder = req.query.order === 'asc' ? 1 : -1;

        // Determine which field to sort by
        let sortStage = {};
        if (sortBy === 'name') {
            sortStage = { 'productDetails.name': sortOrder }; // Sorts by the joined Product Name
        } else {
            sortStage = { 'updatedAt': sortOrder }; // Default: Sorts by Date
        }

        // 3. The Aggregation Pipeline
        const result = await StockItem.aggregate([
            // A. Join with Products collection to get names
            {
                $lookup: {
                    from: 'products',       // Ensure this matches your actual DB collection name (usually lowercase plural)
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productDetails'
                }
            },
            
            // B. Unwind the array so we can access fields directly
            { $unwind: '$productDetails' },

            // C. Apply the Sort
            { $sort: sortStage },

            // D. Get Data + Count (in parallel)
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        // Reshape data to look like the old .populate() format
                        { 
                            $addFields: { productId: "$productDetails" } 
                        },
                        { $project: { productDetails: 0 } }
                    ],
                    metadata: [ { $count: "total" } ]
                }
            }
        ]);

        // 4. Extract data safely
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