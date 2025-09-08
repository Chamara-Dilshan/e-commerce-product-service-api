const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    created_date: { type: Date, default: Date.now },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }]
});

module.exports = mongoose.model('bookmark', BookmarkSchema);
