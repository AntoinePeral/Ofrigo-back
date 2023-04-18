const debug = require("debug")("recipeController");
const { Recipe } = require("../model");
// const logRecipe = require("../../service/test/function/logRecepe");

const recipeController = {

    /**
     * Get all recipes and return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllRecipe (_, res){
        try{
            const recipe = await Recipe.findAllRecipeWithAll();
            debug(recipe);

            res.status(200).json(recipe);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one recipe by his id and return json Object. It contains ingredients, steps, tags and category 
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getRecipeById (req, res){
        const recipeId = req.params.id;

        try{
            const recipe = await Recipe.findOneRecipeWithAll(recipeId);
            debug(recipe);

            res.status(200).json(recipe);
        }catch(error){
            console.log(error);
        }
    },

};

module.exports = recipeController;
