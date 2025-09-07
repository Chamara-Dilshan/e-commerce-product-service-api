const CategorySchema = require('../model/CategorySchema');

//save
const createCategory = async (request, response) => {
    console.log("Hi We are gonna print the body data");
    console.log(request.body);
};

//update
const updateCategory = async (request, response) => {
    console.log(request.body);
};

//delete
const deleteCategory = async (request, response) => {
    console.log(request.body);
};

//find by id
const findCategoryById = async (request, response) => {
    console.log(request.body);
};

//find all
const findAllCategories = async (request, response) => {
    console.log(request.body);
};

module.exports = {
    createCategory, updateCategory, deleteCategory, findCategoryById, findAllCategories
}