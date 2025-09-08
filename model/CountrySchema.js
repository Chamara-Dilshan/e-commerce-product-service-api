const mongoose = require('mongoose');

const FlagSchema 
    = new mongoose.Schema({
        hash: String,
        resource_url: String,
        directory: String,
        file_name: String
}, { _id: false });

const CountrySchema 
    = new mongoose.Schema({
    country_name: { type: String, required: true },
    country_code: { type: String, required: true },
    flag: { type: FlagSchema, default: {} }
});

module.exports = mongoose.model('country', CountrySchema);
