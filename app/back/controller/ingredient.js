const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Ingredient, Category, CoreModel } = require("../../api/model");

const ingredientController = {

    /**
     * Render a list of all ingredients
     * @param {*} _ 
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
    async getAllIngredientPage (_, res, next) {
        const ingredients = await Ingredient.findAll();

        if(ingredients){
            for(const ingredient of ingredients){
                ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
                ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
            
            res.render("ingredients", {
                homeName: "Ingredient",
                ingredients,
                css: "/css/ingredients.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Render a detail ingredient page
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
    async getIngredientPage (req, res, next) {
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findOne(ingredientId);

        if(ingredient){
            ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
            ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
    
            res.render("ingredient", {
                homeName: "Ingredient",
                ingredient,
                css: "/css/ingredient.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Delete an ingredient as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next
     * @returns {APIError} error
     */
    async deleteIngredient (req, res, next) {
        const ingredientId = req.params.id;
        const response = await Ingredient.delete(ingredientId);

        if(response){
            res.redirect("/admin/ingredient");
        }
        else{
            return next(new APIError("La suppression de l'ingrédient a échoué", 400));
        }
    },

    /**
     * Render a create/update ingredient page
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async getCreateIngredientPage (req, res) {
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findOne(ingredientId);
        const categories = await Category.findAll();
        const measures = await CoreModel.findMeasure();

        if(ingredient){
            res.render("ingredient-cu", {
                homeName: "Ingredient",
                css: "/css/ingredient-cu.css",
                errorMessage: null,
                ingredient,
                categories,
                measures
            });
        }
        else{
            res.render("ingredient-cu", {
                homeName: "Ingredient",
                css: "/css/ingredient-cu.css",
                errorMessage: null,
                ingredient: null,
                categories,
                measures
            });
        }
    },

    /**
     * Add ingredient as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async addIngredient (req, res) {
        const ingredientBody = req.body;
        let ingredient = new Ingredient(ingredientBody);

        debug(ingredient);
        ingredient = await ingredient.add();
        debug(ingredient);
        
        res.redirect("/admin/ingredient");
    },

    /**
     * Update an ingredient as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async updateIngredient (req, res) {
        const ingredientBody = req.body;
        const ingredientId = req.params.id;

        if(ingredientBody.category_id == ''){
            ingredientBody.category_id = null;
        }

        let ingredient = await Ingredient.findOne(ingredientId);

        Object.entries(ingredientBody).forEach(([key, value]) => {
            ingredient[key] = value;
        });

        await ingredient.update();
        
        res.redirect("/admin/ingredient");
    },

};

module.exports = ingredientController;