const Product = require('../model/ProductSchema');

// Create (POST)
const createProduct = async (request, response) => {
    try {
        const { product_name, actual_price, qty, categories } = request.body;
        if (!product_name || !actual_price || !qty || !categories || !Array.isArray(categories) || categories.length === 0) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const product = new Product({
            ...request.body
        });
        const saveData = await product.save();
        return response.status(201).json({ code: 201, message: 'Product Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Product Creation Failed...', error });
    }
};

// Update (PUT)
const updateProduct = async (request, response) => {
    try {
        const updateData = await Product.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Product not found...', data: null });
        }
        return response.status(200).json({ code: 200, message: 'Product Updated Successfully...', data: updateData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Product Update Failed...', error });
    }
};

// Delete
const deleteProduct = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await Product.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Product not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Product deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Product deleted Failed...', error });
    }
};

// Find by id
const findProductById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const productData = await Product.findById({ _id: request.params.id });
        if (productData) {
            return response.status(200).json({ code: 200, message: 'Product data found...', data: productData });
        }
        return response.status(404).json({ code: 404, message: 'Product data not found...', data: productData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllProducts = async (request, response) => {
    try {
        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex - 1) * pageSize;
        const productList = await Product.find(query)
            .limit(pageSize)
            .skip(skip);
        const productListCount = await Product.countDocuments(query);
        return response.status(200).json({ code: 200, message: 'Product data found...', data: { list: productList, dataCount: productListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    findAllProducts
};
