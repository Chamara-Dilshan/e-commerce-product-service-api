const mongoose = require('mongoose');

const ReviewSchema 
    = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'order' },
    message: { type: String },
    created_date: { type: Date, default: Date.now },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    user_name: { type: String },
    ratings: { type: Number },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }
});

module.exports = mongoose.model('review', ReviewSchema);
