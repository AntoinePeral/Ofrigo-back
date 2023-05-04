const APIError = require("../error/APIError");
const {Category, CoreModel} = require('../../api/model/')
const { 
    adminAccountSchema,
    userAccountSchema, 
    categorySchema, 
    ingredientSchema,
    messageSchema,
    messageSchemaUser,
    tagSchema,
    stepSchema,
    account_has_ingredientSchema,
    recipe_has_ingredient_with_quantity,
    recipe_has_tag,
    recipeSchema,
    loginSchema
} = require("./schema");

const validationModule = {

    /**
     * Validate the user account schema in order to create it
     * @param {*} param the body enter in the form
     * @param {req} req Express' request
     * @param {next} next call the next middleware
     * @returns {APIError} error
     */
    validateUserAccount(param){
        return (req, _, next) => {
            const { error } = userAccountSchema.validate(req[param]);
            
            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },
    /**
     * Validate admin account schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateAdminAccount(param){
        return (req, res, next) => {
            const { error } = adminAccountSchema.validate(req[param]);

            if (error) {
                res.render('account-cu', {
                    errorMessage: error,
                    css: "/css/account-cu.css",
                    homeName: "Account",
                    account: null
                })
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate category schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateCategory(param){
        return (req, res, next) => {
            const { error } = categorySchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminCategory(param){
        return (req, res, next) => {
            const { error } = categorySchema.validate(req[param]);

            if (error) {
                res.render('categorie-cu', {
                    errorMessage: error,
                    css: "/css/categorie-cu.css",
                    homeName: "Category",
                    category: null
                })
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate ingredient schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateIngredient(param){
        return (req, res, next) => {
            const { error } = ingredientSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminIngredient(param){
        return async (req, res, next) => {
            const { error } = ingredientSchema.validate(req[param]);
            const categories = await Category.findAll();
            const measures = await CoreModel.findMeasure();

            if (error) {
                res.render('ingredient-cu', {
                    errorMessage: error,
                    css: "/css/ingredient-cu.css",
                    homeName: "Ingredient",
                    ingredient: null,
                    categories,
                    measures
                });
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate message schema (From an non-user)
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateMessage(param){
        return (req, res, next) => {
            const { error } = messageSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminMessage(param){
        return (req, res, next) => {
            const { error } = messageSchema.validate(req[param]);

            if (error) {
                res.render('message-cu', {
                    errorMessage: error,
                    css: "/css/message-cu.css",
                    homeName: "Message",
                    message: null
                })
            }
            else{
                next();
            }
        };
    },


    /**
     * Validate user message schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateMessageUser(param){
        return (req, res, next) => {
            const { error } = messageSchemaUser.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate tag schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateTag(param){
        return (req, res, next) => {
            const { error } = tagSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminTag(param){
        return (req, res, next) => {
            const { error } = tagSchema.validate(req[param]);

            if (error) {
                res.render('tag-cu', {
                    errorMessage: error,
                    css: "/css/tag-cu.css",
                    homeName: "Tag",
                    tag: null
                })
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate step schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateStep(param){
        return (req, res, next) => {
            const { error } = stepSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminStep(param){
        return (req, res, next) => {
            const { error } = stepSchema.validate(req[param]);

            if (error) {
                res.render('recipe-cu', {
                    errorMessage: error,
                    css: "/css/recipe-cu.css",
                    homeName: "Recipe"
                })
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate account has an ingredient schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateAccount_has_ingredientSchema(param){
        return (req, res, next) => {
            const { error } = account_has_ingredientSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate recipe has an ingredient with quantity schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateRecipe_has_ingredient_with_quantity(param){
        return (req, res, next) => {
            const { error } = recipe_has_ingredient_with_quantity.validate(req[param]);

            if (error) {
                res.render('recipe-cu', {
                    errorMessage: error,
                    css: "/css/recipe-cu.css",
                    homeName: "Recipe"
                })
            }
            else{
                next();
            }
        };
    },

    validateAdminRecipe_has_ingredient_with_quantity(param){
        return (req, res, next) => {
            const { error } = recipe_has_ingredient_with_quantity.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate recipe has tag schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateRecipe_has_tag(param){
        return (req, res, next) => {
            const { error } = recipe_has_tag.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminRecipe_has_tag(param){
        return (req, res, next) => {
            const { error } = recipe_has_tag.validate(req[param]);

            if (error) {
                res.render('recipe-cu', {
                    errorMessage: error,
                    css: "/css/recipe-cu.css",
                    homeName: "Recipe"
                })
            }
            else{
                next();
            }
        };
    },

    /**
     * Validate recipe schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateRecipe(param){
        return (req, res, next) => {
            const { error } = recipeSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminRecipe(param){
        return (req, res, next) => {
            const { error } = recipeSchema.validate(req[param]);

            if (error) {
                res.render('recipes', {
                    errorMessage: error,
                    css: "/css/recipes.css",
                    homeName: "Recipes"
                })
            }
            else{
                next();
            }
        };
    },
    /**
     * Validate login schema 
     * @param {object} param an object contains in a body send to the back-office 
     * @returns {APIError} error
     */
    validateLogin(param){
        return (req, res, next) => {
            const { error } = loginSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

    validateAdminLogin(param){
        return (req, res, next) => {
            const { error } = loginSchema.validate(req[param]);
          
            if (error) {
                res.render('login', {
                    errorMessage: error,
                    css: "/css/login.css",
                    homeName: "Login"
                });
            }
            else{
                next();
            }
        };
    }

};

module.exports = validationModule;