const debug = require("debug")("recipeController");
const APIError = require('../../service/error/APIError');
const { Recipe } = require("../model");

const recipeController = {

    /**
     * Get all recipes and return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllRecipe (_, res, next){
        const recipe = await Recipe.findAll();

        if(recipe){
            debug(recipe);
            res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one recipe by his id and return json Object. It contains ingredients, steps, tags and category 
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getRecipeById (req, res, next){
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne(recipeId);

        if(recipe){
            debug(recipe);
            res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 400));
        }

    },

    async addRecipe (req, res, next) {
        const recipeBody = req.body;
        const recipe = new Recipe(recipeBody);

        if(recipe){
            debug(recipe);
            await recipe.add();
            debug(recipe);
            res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async updateRecipe (req, res, next) {
        const recipeId = req.params.id;
        const recipeBody = req.body;
        let recipe = await Recipe.findOne(recipeId);


        if(recipe){
            debug(recipe);

            for (const key in recipeBody) {
                recipe[key] = recipeBody[key];
            }

            await recipe.update();
            const newRecipe = await Recipe.findOne(recipeId);
            debug(newRecipe);
            res.status(200).json(newRecipe);
        }
        else{
            next(new APIError("Bad request", 401));
        }
    },

    async deleteRecipe (req, res, next) {
        const recipeId = req.params.id;
        const response = await Recipe.delete(recipeId);


        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

};

module.exports = recipeController;
