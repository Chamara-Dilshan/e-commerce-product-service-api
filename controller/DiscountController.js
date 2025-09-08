const Discount = require('../model/DiscountSchema');

// Create (POST)
const createDiscount = async (request, response) => {
    try {
        const { discount_name, percentage, start_date, end_date } = request.body;
        if (!discount_name || !percentage || !start_date || !end_date) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const discount = new Discount({
            ...request.body
        });
        const saveData = await discount.save();
        return response.status(201).json({ code: 201, message: 'Discount Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Discount Creation Failed...', error });
    }
};

// Update (PUT)
const updateDiscount = async (request, response) => {
    try {
        const updateData = await Discount.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Discount not found...', data: null });
        }
        return response.status(200).json({ code: 200, message: 'Discount Updated Successfully...', data: updateData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Discount Update Failed...', error });
    }
};

// Delete
const deleteDiscount = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await Discount.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Discount not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Discount deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Discount deleted Failed...', error });
    }
};

// Find by id
const findDiscountById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const discountData = await Discount.findById({ _id: request.params.id });
        if (discountData) {
            return response.status(200).json({ code: 200, message: 'Discount data found...', data: discountData });
        }
        return response.status(404).json({ code: 404, message: 'Discount data not found...', data: discountData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllDiscounts = async (request, response) => {
    try {
        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex - 1) * pageSize;
        const discountList = await Discount.find(query)
            .limit(pageSize)
            .skip(skip);
        const discountListCount = await Discount.countDocuments(query);
        return response.status(200).json({ code: 200, message: 'Discount data found...', data: { list: discountList, dataCount: discountListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createDiscount,
    updateDiscount,
    deleteDiscount,
    findDiscountById,
    findAllDiscounts
};
