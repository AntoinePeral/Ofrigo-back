const debug = require("debug")("ingredientController");
const { Ingredient } = require("../model");

const ingredientController = {

    async getAllIngredient (_, res){
        try{
            const ingredient = await Ingredient.findAll();
            debug(ingredient);

            res.status(200).json(ingredient);
        }catch(error){
            console.log(error);
        }
    },

    async getIngredientById (req, res){
        const ingredientId = req.params.id;

        try{
            const ingredient = await Ingredient.findOne(ingredientId);
            debug(ingredient);

            res.status(200).json(ingredient);
        }catch(error){
            console.log(error);
        }
    },
    
};

module.exports= ingredientController;