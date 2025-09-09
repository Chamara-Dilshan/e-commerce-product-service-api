const ProductSchema = require('../model/ProductSchema');
const Product = require('../model/ProductSchema');

// Create (POST)
const createProduct = async (request, response) => {
    try {
        const { productName, file , actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;
        if (!productName || !file ||!actualPrice ||!oldPrice || !qty || !description ||!discount ||!categoryId ) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const product = new ProductSchema({
            productName:productName,
            images:[
                {
                    hash:'Temp Hash', 
                    resourceUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/250px-Original_Doge_meme.jpg', 
                    fileName:'Temp File Name', 
                    directory:'Temp Directory'
                }
            ],
            actualPrice:actualPrice,
            oldPrice:oldPrice,
            qty:qty,
            description:description,
            discount:discount,
            categoryId:categoryId,

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
        const {productName, actualPrice, oldPrice, qty, description, discount, categoryId } = request.body;
        if (!productName ||!actualPrice ||!oldPrice || !qty || !description ||!discount ||!categoryId ) {
            return response.status(400).json({code: 400, message: 'Required fields are missing...', data: null});
        }
        const updateData = await ProductSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                productName:productName,
                actualPrice:actualPrice,
                oldPrice:oldPrice,
                qty:qty,
                description:description,
                discount:discount,
                categoryId:categoryId,
            }
        }, {new:true});
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
        const deletedData = await ProductSchema.findOneAndDelete({ _id: request.params.id });
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
        const productData = await ProductSchema.findById({ _id: request.params.id });
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
        const productList = await ProductSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const productListCount = await ProductSchema.countDocuments(query);
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
