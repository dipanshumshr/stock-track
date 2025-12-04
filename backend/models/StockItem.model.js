const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    brand: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    purchasePrice: { type: Number, default: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    expiryDate: { type: Date }, // No longer required
}, { timestamps: true });

module.exports = mongoose.model('StockItem', stockItemSchema);