
const CartSchema = require('../model/CartSchema');

// Create (POST)
const createCart = async (request, response) => {
    try {
        const { userId, productId, qty, createdDate } = request.body;
        if (!userId || !productId || !createdDate || !qty) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const cart = new CartSchema({
            userId:userId,
            productId:productId,
            createdDate:createdDate,
            qty:qty
        });
        const saveData = await cart.save();
        return response.status(201).json({ code: 201, message: 'Cart Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Cart Creation Failed...', error });
    }
};

// Update (PUT)
const updateCart = async (request, response) => {
    try {
         const { userId, productId, createdDate, qty } = request.body;
        if (!userId || !productId || !createdDate || !qty) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const updateData = await CartSchema.findOneAndUpdate({ _id: request.params.id }, {
            $set: {
                userId:userId,
                productId:productId,
                createdDate:createdDate,
                qty:qty
            }
        }, { new: true });
        return response.status(200).json({ code: 200, message: 'Cart Updated Successfully...', data: updateData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Cart Update Failed...', error });
    }
};

// Delete
const deleteCart = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await CartSchema.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Cart not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Cart deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Cart deleted Failed...', error });
    }
};

// Find by id
const findCartById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const cartData = await CartSchema.findById({ _id: request.params.id });
        if (cartData) {
            return response.status(200).json({ code: 200, message: 'Cart data found...', data: cartData });
        }
        return response.status(404).json({ code: 404, message: 'Cart data not found...', data: cartData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllCarts = async (request, response) => {
    try {
        const { page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const skip = (pageIndex - 1) * pageSize;
        const cartList = await CartSchema.find()
            .limit(pageSize)
            .skip(skip);
        const cartListCount = await CartSchema.countDocuments();
        return response.status(200).json({ code: 200, message: 'Cart data found...', data: { list: cartList, dataCount: cartListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    findCartById,
    findAllCarts
};
