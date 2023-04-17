const debug = require("debug")("categoryController");
const { Category } = require("../model");

const categoryController = {

    async getAllCategory (_, res){
        try{
            const category = await Category.findAll();
            debug(category);

            res.status(200).json(category);
        }catch(error){
            console.log(error);
        }
    },

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