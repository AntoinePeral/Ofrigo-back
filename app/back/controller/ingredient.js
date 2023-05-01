const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Ingredient } = require("../../api/model");

const ingredientController = {

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
            return next(new APIError("Not found", 404));
        }
    },

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
            return next(new APIError("Not found", 404));
        }
    },

    async deleteIngredient (req, res) {
        const ingredientId = req.params.id;
        await Ingredient.delete(ingredientId);

        res.redirect("/admin/ingredient");
    },

};

module.exports = ingredientController;