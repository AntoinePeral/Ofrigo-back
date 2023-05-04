const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Recipe, Ingredient, Tag, Step } = require("../../api/model");

const recipeController = {

    /**
     * Render a list of all recipes
     * @param {*} _ 
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
    async getAllRecipePage(_, res, next){
        const recipes = await Recipe.findAll();

        if(recipes){
            for(const recipe of recipes){
                recipe.created_at = dayjs(recipe.created_at).format('DD-MM-YYYY HH:mm:ss');
                recipe.updated_at = dayjs(recipe.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("recipes", {
                homeName: "Recipe",
                recipes,
                css: "/css/recipes.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Render a single recipe detail page
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
    async getRecipePage (req, res, next) {
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne(recipeId);

        if(recipe){
            recipe.created_at = dayjs(recipe.created_at).format('DD-MM-YYYY HH:mm:ss');
            recipe.updated_at = dayjs(recipe.updated_at).format('DD-MM-YYYY HH:mm:ss');

            if(recipe.ingredient){
                for(const ingredient of recipe.ingredient){
                    ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
                    ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }
            if(recipe.step){
                for(const step of recipe.step){
                    step.created_at = dayjs(step.created_at).format('DD-MM-YYYY HH:mm:ss');
                    step.updated_at = dayjs(step.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }
            if(recipe.tag){
                for(const tag of recipe.tag){
                    tag.created_at = dayjs(tag.created_at).format('DD-MM-YYYY HH:mm:ss');
                    tag.updated_at = dayjs(tag.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }

            res.render("recipe", {
                homeName: "Recipe",
                recipe,
                css: "/css/recipe.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Delete a recipe as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async deleteRecipe (req, res) {
        const recipeId = req.params.id;
        const response = await Recipe.delete(recipeId);
        
        if(response){
            res.redirect("/admin/recipe");
        }
        else{
             next();
        }
    },

    /**
     * Remove an ingredient from a recipe
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next 
     * @returns {APIError} error
     */
    async removeIngredientFromRecipe (req, res, next) {
        const { recipeId, ingredientId } = req.params;
        const recipe = await Recipe.findOne(recipeId);
        const ingredient = await Ingredient.findOne(ingredientId);

        if(recipe && ingredient){
            const response = await Recipe.deleteIngredientFromRecipe(recipeId, ingredientId);

            if(response){
                res.redirect(`/admin/recipe/${recipeId}`);
            }
            else{
                return next(new APIError("la suppression d'un ingrédient a échoué", 400)); 
            }
        }
        else{
            return next(new APIError("Aucun ingrédient n'est sélectionné", 400)); 
        }
    },

    /**
     * Remove a step from a recipe
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next 
     * @returns {APIError} error
     */
    async removeStepFromRecipe (req, res, next) {
        const { recipeId, stepId } = req.params;
        const recipe = await Recipe.findOne(recipeId);

        if(recipe){
            const response = await Step.deleteStepFromRecipe(stepId);

            if(response){
                res.redirect(`/admin/recipe/${recipeId}`);
            }
            else{
                return next(new APIError("La suppression d'une étape a échoué", 400)); 
            }
        }
        else{
            return next(new APIError("Aucune étape n'est sélectionnée", 400)); 
        }
    },

    /**
     * Remove a tag from a recipe
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next 
     * @returns {APIError} error
     */
    async removeTagFromRecipe (req, res, next) {
        const { recipeId, tagId } = req.params;
        const recipe = await Recipe.findOne(recipeId);
        const tag = await Tag.findOne(tagId);

        if(recipe && tag){
            const response = await Recipe.deleteTagFromRecipe(recipeId, tagId);

            if(response){
                res.redirect(`/admin/recipe/${recipeId}`);
            }
            else{
                return next(new APIError("La suppression d'un tag a échoué", 400)); 
            }
        }
        else{
            return next(new APIError("Aucun tag n'est sélectionné", 400)); 
        }
    },

    /**
     * Render the create/update page 
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async getCreateRecipePage (req, res) {
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne(recipeId);

        if(recipe){
            res.render("recipe-cu", {
                homeName: "recipe",
                css: "/css/recipe-cu.css",
                errorMessage: null,
                recipe
            });
        }
        else{
            res.render("recipe-cu", {
                homeName: "recipe",
                css: "/css/recipe-cu.css",
                errorMessage: null,
                recipe: null
            });
        }
    },

    /**
     * Add a recipe as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async addRecipe (req, res) {
        const recipeBody = req.body;
        let recipe = new Recipe(recipeBody);

        debug(recipe);
        recipe = await recipe.add();
        debug(recipe);
        
        res.redirect("/admin/recipe");
    },

    /**
     * Update a recipe as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async updateRecipe (req, res) {
        const recipeBody = req.body;
        const recipeId = req.params.id;

        let recipe = await Recipe.findOne(recipeId);

        Object.entries(recipeBody).forEach(([key, value]) => {
            recipe[key] = value;
        });

        await recipe.update();
        
        res.redirect("/admin/recipe");
    },

};

module.exports = recipeController;