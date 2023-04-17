const debug = require("debug")("recipeController");
const { Recipe } = require("../model");
const logRecipe = require("../../service/test/function/logRecepe");

const recipeController = {

    async getAllRecipe (_, res){
        try{
            const recipe = await Recipe.findAllRecipeWithAll();
            debug(recipe);

            res.status(200).json(recipe);
        }catch(error){
            console.log(error);
        }
    },

    async getRecipeById (req, res){
        const recipeId = req.params.id;

        try{
            const recipe = await Recipe.findOneRecipeWithAll(recipeId);
            debug(recipe);

            logRecipe(recipe);

            res.status(200).json(recipe);
        }catch(error){
            console.log(error);
        }
    },

};

module.exports = recipeController;
