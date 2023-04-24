const debug = require("debug")("recipeController");
const APIError = require('../../service/error/APIError');
const { Recipe, Ingredient, Quantity, Step, Tag } = require("../model");

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
            debug("test", recipe);
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

    async addIngredientToRecipe (req, res, next) {
        const recipeId = req.params.id;
        const { ingredient_id, ingredient_quantity } = req.body;
        let recipe = await Recipe.findOne(recipeId);
        const ingredient = await Ingredient.findOne(ingredient_id);
        let validation;

        if(recipe && ingredient){
            for (const element of recipe.ingredient){
                if(element.id === ingredient.id){
                    validation = false;
                }
                else{
                    validation = true;
                }
            }
        }
        if(validation){
            await recipe.addIngredient(ingredient_id, ingredient_quantity);
            return res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async updateIngredientOfRecipe (req, res, next) {
        const recipeId = req.params.id;
        const { ingredient_id, ingredient_quantity } = req.body;
        console.log(req.body);
        let recipe = await Recipe.findOne(recipeId);
        const ingredient = await Ingredient.findOne(ingredient_id);
        let validation;

        if(recipe && ingredient){
            for (const element of recipe.ingredient){
                if(element.id === ingredient.id){
                    validation = true;
                }
                else{
                    validation = false;
                }
            }
        }
        if(validation){
            await recipe.updateIngredient(ingredient_id, ingredient_quantity);
            return res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async deleteIngredientOfRecipe (req, res, next) {
        const { recipeId, ingredientId } = req.params;
        let recipe = await Recipe.findOne(recipeId);
        const ingredient = await Ingredient.findOne(ingredientId);
        let validation;

        for(const ingredient of recipe.ingredient){
            if(ingredient.id == ingredientId){
                validation = true;
            }
            else{
                validation = false;
            }
        }

        if(validation){
            await recipe.removeIngredient(ingredientId);
            res.status(200).json(recipe);
        }
        else{
            next(new APIError("Bad request", 500)); 
        }
    }

    // async addStepToRecipe (req, res, next) {

    // },

    // async updateStepOfRecipe (req, res, next) {

    // },

    // async deleteStepToRecipe (req, res, next) {

    // },

    // async addTagToRecipe (req, res, next) {

    // },

    // async updateTagOfRecipe (req, res, next) {

    // },

};

module.exports = recipeController;
