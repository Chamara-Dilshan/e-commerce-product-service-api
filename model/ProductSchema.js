const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    actual_price: { type: Number, required: true },
    old_price: { type: Number },
    qty: { type: Number, required: true },
    description: { type: String },
    images: { type: [String], default: [] },
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'discount' },
    categories: { type: [mongoose.Schema.Types.ObjectId], ref: 'category', required: true }
});

module.exports = mongoose.model('product', ProductSchema);
