const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Category, Ingredient } = require("../../api/model");

const categoryController = {

    async getAllCategoryPage(_, res, next){     
        const categories = await Category.findAll();

        if(categories){
            for(const categorie of categories){
                categorie.created_at = dayjs(categorie.created_at).format('DD-MM-YYYY HH:mm:ss');
                categorie.updated_at = dayjs(categorie.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("categories", {
                homeName: "Category",
                categories,
                css: "/css/categories.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getCategoryPage (req, res, next) {
        const categoryId = req.params.id;
        const category = await Category.findOne(categoryId);

        if(category){
            category.created_at = dayjs(category.created_at).format('DD-MM-YYYY HH:mm:ss');
            category.updated_at = dayjs(category.updated_at).format('DD-MM-YYYY HH:mm:ss');
    
            for(const ingredient of category.ingredient){
                ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
                ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("categorie", {
                homeName: "Category",
                category,
                css: "/css/categorie.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async deleteCategory (req, res, next) {
        const categoryId = req.params.id;
        const ingredients = await Ingredient.findAllIngredientCategory(categoryId);

        for(const ingredient of ingredients){
            ingredient.category_id = null;
            await ingredient.update();
        }

        const response = await Category.delete(categoryId);

        if(response){
            res.redirect("/admin/category");
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async removeIngredientFromCategory (req, res, next) {
        const { categoryId, ingredientId } = req.params;
        const category = await Category.findOne(categoryId);
        const ingredient = await Ingredient.findOne(ingredientId);

        if(ingredient && category){
            ingredient.category_id = null;
            await ingredient.update();

            res.redirect(`/admin/category/${categoryId}`);
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

};

module.exports = categoryController;