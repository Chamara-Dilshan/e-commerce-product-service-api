const mongoose = require('mongoose');

const ReviewSchema 
    = new mongoose.Schema({
    orderId: { 
        type: Object, 
        required: true, 
    },
    message: { 
        type: String 
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    },
    userId: { 
        type: Object, 
    },
    displayName: {
        type: String 
    },
    ratings: { 
        type: Number 
    },
    productId: { 
        type: Object, 

    }
});

module.exports = mongoose.model('review', ReviewSchema);
