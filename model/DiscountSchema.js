const mongoose = require('mongoose');

const DiscountSchema 
    = new mongoose.Schema({
    discountName: { 
        type: String, 
        required: true 
    },
    percentage: { 
        type: Number,
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    lastUpdate: { 
        type: Date, 
        default: 
        Date.now 
    },
});

module.exports = mongoose.model('discounts', DiscountSchema);
