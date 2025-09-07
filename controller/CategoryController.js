const CategorySchema  = require('../model/CategorySchema');

//create (POST)
const createCategory = async (request, response) => {

    try {
        const {categoryName, file, countryIds} = request.body;
        if (!categoryName || !file || !countryIds) {
            return response.status(400).json({code: 400, message: 'Required fields are missing', data: null});
        }

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
        return response.status(201).json({code:201, message:'Category Created Successfully', data:saveData});
            
    } catch (error) {
        console.log(error);
        response.status(500).json({code:500, message:'Category Creation Failed', error:error});
    } 
};

//update (PUT)
const updateCategory = async (request, response) => {
    try {
        const {categoryName} = request.body;
        if (!categoryName) {
            return response.status(400).json({code: 400, message: 'Required fields are missing', data: null});
        }
        const updateData = await CategorySchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                categoryName:categoryName
            }
        }, {new:true});

        return response.status(200).json({code:200, message:'Category Updated Successfully', data:updateData});
            
    } catch (error) {
        console.log(error);
        response.status(500).json({code:500, message:'Category Updated Failed', error:error});
    }
   
};

//delete
const deleteCategory = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'Required fields are missing', data: null});
        }
        const deletedData = await CategorySchema.findOneAndDelete({'_id':request.params.id});
        return response.status(204).json({code:204, message:'Category deleted Successfully', data:deletedData});
            
    } catch (error) {
        response.status(500).json({code:500, message:'Category deleted Failed', error:error});
    }
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