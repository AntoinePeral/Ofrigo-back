const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Category, Ingredient } = require("../../api/model");

const categoryController = {

    /**
     * Render list of all categories
     * @param {*} _ 
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     */
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
            next();
        }
    },

    /**
     * Render a single category detail page
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     */
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
            next();
        }
    },

    /**
     * Delete a category as admin
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next 
     * @returns {APIError} error
     */
    async deleteCategory (req, res, next) {
        const categoryId = req.params.id;
        const ingredients = await Ingredient.findAllIngredientCategory(categoryId);

        if(ingredients){
            if(ingredients.length){
                for(const ingredient of ingredients){
                    ingredient.category_id = null;
                    await ingredient.update();
                }
            }
            else{
                ingredients.category_id = null;
            }

        }

        const response = await Category.delete(categoryId);

        if(response){
            res.redirect("/admin/category");
        }
        else{
            return next(new APIError("La suppression d'une catégorie a échoué", 400));
        }
    },

    /**
     * Remove an ingredient from a category
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next
     * @returns {APIError} error
     */
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
            return next(new APIError("La suppression de l'ingrédient a échoué", 400));
        }
    },

    /**
     * Render the category create/update page as admin
     * @param {req} req Express request
     * @param {res} res  Express response
     */
    async getCreateCategoryPage (req, res) {
        const categoryId = req.params.id;
        const category = await Category.findOne(categoryId);

        if(category){
            res.render("categorie-cu", {
                homeName: "Category",
                css: "/css/categorie-cu.css",
                errorMessage: null,
                category
            });
        }
        else{
            res.render("categorie-cu", {
                homeName: "Category",
                css: "/css/categorie-cu.css",
                errorMessage: null,
                category: null
            });
        }
    },

    /**
     * Add a category to the DB
     * @param {req} req Express request
     * @param {res} res  Express response
     */
    async addCategory (req, res) {
        const categoryBody = req.body;
        let category = new Category(categoryBody);

        debug(category);
        category = await category.add();
        debug(category);
        
        res.redirect("/admin/category");
    },

    /**
     * Update a category to the DB
     * @param {req} req Express request
     * @param {res} res  Express response
     */
    async updateCategory (req, res) {
        const categoryBody = req.body;
        const categoryId = req.params.id;

        let category = await Category.findOne(categoryId);

        Object.entries(categoryBody).forEach(([key, value]) => {
            category[key] = value;
        });

        await category.update();
        
        res.redirect("/admin/category");
    },

};

module.exports = categoryController;