const CountrySchema = require('../model/CountrySchema');

// Create (POST)
const createCountry = async (request, response) => {
    try {
        const { countryName, file, countryCode } = request.body;
        if (!countryName ||!file ||!countryCode) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const country = new CountrySchema({
            countryName:countryName,
            flag:{
                hash:'Temp Hash', 
                resourceUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/250px-Original_Doge_meme.jpg', 
                fileName:'Temp File Name', 
                directory:'Temp Directory'
            },
            countryCode:countryCode,
        });
        const saveData = await country.save();
        return response.status(201).json({ code: 201, message: 'Country Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Country Creation Failed...', error });
    }
};

// Update (PUT)
const updateCountry = async (request, response) => {
    try {
        const {countryName, countryCode} = request.body;
        if (!countryName || !countryCode) {
            return response.status(400).json({code: 400, message: 'Required fields are missing...', data: null});
        }
        const updateData = await CountrySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                countryName:countryName,
                countryCode:countryCode
            }
            }, {new:true});
            return response.status(200).json({code:200, message:'Country Updated Successfully...', data:updateData});
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Country Update Failed...', error });
    }
};

// Delete
const deleteCountry = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await CountrySchema.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Country not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Country deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Country deleted Failed...', error });
    }
};

// Find by id
const findCountryById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const countryData = await CountrySchema.findById({ _id: request.params.id });
        if (countryData) {
            return response.status(200).json({ code: 200, message: 'Country data found...', data: countryData });
        }
        return response.status(404).json({ code: 404, message: 'Country data not found...', data: countryData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllCountries = async (request, response) => {
    try {
        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex - 1) * pageSize;
        const countryList = await CountrySchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const countryListCount = await CountrySchema.countDocuments(query);
        return response.status(200).json({ code: 200, message: 'Country data found...', data: { list: countryList, dataCount: countryListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createCountry,
    updateCountry,
    deleteCountry,
    findCountryById,
    findAllCountries
};
