const debug = require("debug")("categoryController");
const { Category } = require("../model");

const categoryController = {

    /**
     * Get all categories return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllCategory (_, res){
        try{
            const category = await Category.findAll();
            debug(category);

            res.status(200).json(category);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one category by his id json return Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getCategoryById (req, res){
        const categoryId = req.params.id;

        try{
            const category = await Category.findOne(categoryId);
            debug(category);

            res.status(200).json(category);
        }catch(error){
            console.log(error);
        }
    },
    
};

module.exports= categoryController;