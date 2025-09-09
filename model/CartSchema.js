const mongoose = require('mongoose');

const CartSchema 
    = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true, 
    },
    createdDate: { 
        type: Date,
        default: Date.now
    },
    productId: { 
        type: Object,
    },
    qty: { 
        type: Number,

    }
});

module.exports = mongoose.model('carts', CartSchema);
