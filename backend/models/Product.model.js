const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    measure: { type: String, trim: true },
    potency: { type: String, trim: true },
}, { timestamps: true });

// This ensures we don't have duplicate generic products
productSchema.index({ name: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);