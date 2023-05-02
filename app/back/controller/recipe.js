const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Recipe } = require("../../api/model");

const recipeController = {

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
            return next(new APIError("Not found", 404));
        }
    },

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
            return next(new APIError("Not found", 404));
        }
    },

    async deleteRecipe (req, res) {
        const recipeId = req.params.id;
        await Recipe.delete(recipeId);

        res.redirect("/admin/recipe");
    },

};

module.exports = recipeController;