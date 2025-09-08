const Country = require('../model/CountrySchema');

// Create (POST)
const createCountry = async (request, response) => {
    try {
        const { country_name, country_code } = request.body;
        if (!country_name || !country_code) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const country = new Country({
            ...request.body
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
        const updateData = await Country.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Country not found...', data: null });
        }
        return response.status(200).json({ code: 200, message: 'Country Updated Successfully...', data: updateData });
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
        const deletedData = await Country.findOneAndDelete({ _id: request.params.id });
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
        const countryData = await Country.findById({ _id: request.params.id });
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
        const countryList = await Country.find(query)
            .limit(pageSize)
            .skip(skip);
        const countryListCount = await Country.countDocuments(query);
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
