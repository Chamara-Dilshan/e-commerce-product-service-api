const mongoose = require('mongoose');

const BookmarkSchema 
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
    }
});

module.exports = mongoose.model('bookmark', BookmarkSchema);
