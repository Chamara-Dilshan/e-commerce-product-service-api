const CategorySchema = require('../model/CategorySchema');

//create (POST)
const createCategory = async (request, response) => {

    try {

        const {categoryName, file, countryId} = request.body;
        if (!categoryName || !file || !countryId) {
            return response.status(400).json({code: 400, message: 'Required fields are missing', data: null});
        }

        console.log("Hi We are gonna print the Body Data");

        const category=new CategorySchema({
            categoryName:categoryName,
            icon:{
                hash:'Temp Hash', 
                resourceUrl:'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/250px-Original_Doge_meme.jpg', 
                fileName:'Temp File Name', 
                directory:'Temp Directory'
            },
            availableCountries:[
                {
                    countryId:'Temp-Id-1',
                    countryName:'Sri Lanka'
                },
                {
                    countryId:'Temp-Id-1',
                    countryName:'Sri Lanka'
                },
            ]
            });

        const saveData = await category.save();
        console.log(result);
        response.status(201).json({code:201, message:'Category Created Successfully', data:result});
            
    } catch (error) {
        console.log(error);
        response.status(500).json({code:500, message:'Category Creation Failed', error:error});
    }
   
};

//update (PUT)
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