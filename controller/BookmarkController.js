const Bookmark = require('../model/BookmarkSchema');

// Create (POST)
const createBookmark = async (request, response) => {
    try {
        const { user_id, products } = request.body;
        if (!user_id || !products || !Array.isArray(products) || products.length === 0) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const bookmark = new Bookmark({
            user_id,
            products,
            created_date: new Date()
        });
        const saveData = await bookmark.save();
        return response.status(201).json({ code: 201, message: 'Bookmark Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Bookmark Creation Failed...', error });
    }
};

// Update (PUT)
const updateBookmark = async (request, response) => {
    try {
        const { products } = request.body;
        if (!products || !Array.isArray(products) || products.length === 0) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const updateData = await Bookmark.findOneAndUpdate({ _id: request.params.id }, {
            $set: { products }
        }, { new: true });
        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Bookmark not found...', data: null });
        }
        return response.status(200).json({ code: 200, message: 'Bookmark Updated Successfully...', data: updateData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Bookmark Update Failed...', error });
    }
};

// Delete
const deleteBookmark = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await Bookmark.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Bookmark not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Bookmark deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Bookmark deleted Failed...', error });
    }
};

// Find by id
const findBookmarkById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const bookmarkData = await Bookmark.findById({ _id: request.params.id });
        if (bookmarkData) {
            return response.status(200).json({ code: 200, message: 'Bookmark data found...', data: bookmarkData });
        }
        return response.status(404).json({ code: 404, message: 'Bookmark data not found...', data: bookmarkData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllBookmarks = async (request, response) => {
    try {
        const { page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const skip = (pageIndex - 1) * pageSize;
        const bookmarkList = await Bookmark.find()
            .limit(pageSize)
            .skip(skip);
        const bookmarkListCount = await Bookmark.countDocuments();
        return response.status(200).json({ code: 200, message: 'Bookmark data found...', data: { list: bookmarkList, dataCount: bookmarkListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createBookmark,
    updateBookmark,
    deleteBookmark,
    findBookmarkById,
    findAllBookmarks
};
