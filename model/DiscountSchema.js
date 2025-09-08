const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    discount_name: { type: String, required: true },
    percentage: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    last_update: { type: Date, default: Date.now },
    active_status: { type: Boolean, default: true }
});

module.exports = mongoose.model('discount', DiscountSchema);
