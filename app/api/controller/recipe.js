const debug = require("debug")("recipeController");
const APIError = require('../../service/error/APIError');
const { Recipe, Ingredient } = require("../model");

const recipeController = {

    /**
     * Get all recipes and return json Objects in array
     * @param {*} _ 
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getAllRecipe (_, res, next){
        const recipes = await Recipe.findAll();
        const recipesToSend = recipes.map(recipe =>{
            return {
                ...recipe,
                picture: `/public/picture/recipe/${recipe.picture}`
            }
        }); 

        if(recipesToSend){
            debug(recipesToSend);
            res.status(200).json(recipesToSend);
        }
        else{
            return next(new APIError("Aucune recette trouvée", 400));
        }
    },

    /**
     * Get one recipe by his id and return json Object. It contains ingredients, steps, tags and category 
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getRecipeById (req, res, next){
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne(recipeId);
        recipe.picture= `/public/picture/recipe/${recipe.picture}`;

        if(recipe){
            debug(recipe);
            res.status(200).json(recipe);
        }
        else{
            return next(new APIError("Aucune recette n'est trouvée", 400));
        }

    },

        /**
     * Get one recipe by his id and return json Object. It contains ingredients, steps, tags and category 
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
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
            return next(new APIError("L'ajout d'une recette a échoué", 400));
        }
    },

    /**
     * Update a recipe and return an object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async updateRecipe (req, res, next) {
        const recipeId = req.params.id;
        const recipeBody = req.body;
        let recipe = await Recipe.findOne(recipeId)
      
        for (const value in recipeBody) {
            recipe[value] = recipeBody[value];
        }


        if(recipe){
            debug(recipe);

            for (const value in recipeBody) {
                recipe[value] = recipeBody[value];
            }

            await recipe.update();


            const newRecipe = await Recipe.findOne(recipeId);
            debug(newRecipe);
            res.status(200).json(newRecipe);
        }
        else{
            return next(new APIError("La modification de la recette a échoué ", 400));
        }
    },

    /**
     * Delete one recipe by his id and return an string
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async deleteRecipe (req, res, next) {
        const recipeId = req.params.id;
        const response = await Recipe.delete(recipeId);


        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("La suppression de la recette a échoué", 400));
        }
    },

    /**
     * Add an ingredient to a recipe
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {object} return an json recipe
     * @returns {APIError} return error
     */
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
            return next(new APIError("L'ingrédient est existe déjà en base de donnée", 400));
        }
    },

    /**
     * Modify an ingredient of a recipe
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {object} return an json recipe
     * @returns {APIError} return error
     */
    async updateIngredientOfRecipe (req, res, next) {
        const recipeId = req.params.id;
        const { ingredient_id, ingredient_quantity } = req.body;
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
            return next(new APIError("L'ingrédient sélectionné n'est pas enregistré en base de donnée", 500));
        }
    },

    /**
     * Delete an ingredient of a recipe
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {object} return an json recipe
     * @returns {APIError} return error
     */
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
            return res.status(200).json(recipe);
        }
        else{
            return next(new APIError("La suppression de l'ingrédient a échoué", 400)); 
        }
    }

};

module.exports = recipeController;
