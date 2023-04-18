const debug = require("debug")("ingredientController");
const { Ingredient } = require("../model");

const ingredientController = {

    /**
     * Get all ingredients return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllIngredient (_, res){
        try{
            const ingredient = await Ingredient.findAll();
            debug(ingredient);

            res.status(200).json(ingredient);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one ingredient by his id return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
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