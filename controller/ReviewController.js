const Review = require('../model/ReviewSchema');

// Create (POST)
const createReview = async (request, response) => {
    try {
        const { order_id, user_id, products, ratings } = request.body;
        if (!order_id || !user_id || !products || !ratings) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const review = new Review({
            ...request.body
        });
        const saveData = await review.save();
        return response.status(201).json({ code: 201, message: 'Review Created Successfully...', data: saveData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Review Creation Failed...', error });
    }
};

// Update (PUT)
const updateReview = async (request, response) => {
    try {
        const updateData = await Review.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        if (!updateData) {
            return response.status(404).json({ code: 404, message: 'Review not found...', data: null });
        }
        return response.status(200).json({ code: 200, message: 'Review Updated Successfully...', data: updateData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Review Update Failed...', error });
    }
};

// Delete
const deleteReview = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const deletedData = await Review.findOneAndDelete({ _id: request.params.id });
        if (!deletedData) {
            return response.status(404).json({ code: 404, message: 'Review not found...', data: null });
        }
        return response.status(204).json({ code: 204, message: 'Review deleted Successfully...', data: deletedData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Review deleted Failed...', error });
    }
};

// Find by id
const findReviewById = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'Required fields are missing...', data: null });
        }
        const reviewData = await Review.findById({ _id: request.params.id });
        if (reviewData) {
            return response.status(200).json({ code: 200, message: 'Review data found...', data: reviewData });
        }
        return response.status(404).json({ code: 404, message: 'Review data not found...', data: reviewData });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

// Find all
const findAllReviews = async (request, response) => {
    try {
        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);
        const query = {};
        if (searchText) {
            query.$text = { $search: searchText };
        }
        const skip = (pageIndex - 1) * pageSize;
        const reviewList = await Review.find(query)
            .limit(pageSize)
            .skip(skip);
        const reviewListCount = await Review.countDocuments(query);
        return response.status(200).json({ code: 200, message: 'Review data found...', data: { list: reviewList, dataCount: reviewListCount } });
    } catch (error) {
        response.status(500).json({ code: 500, message: 'Something went wrong...', error });
    }
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    findReviewById,
    findAllReviews
};
