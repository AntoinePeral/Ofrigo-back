const APIError = require("../error/APIError");
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
     * Validate schema user
     * @param {*} param 
     * @returns 
     */
    validateUserAccount(param){
        return (req, _, next) => {
            const { error } = userAccountSchema.validate(req[param]);
            
            if (error) {
                console.log(error.message);
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
        return (req, _, next) => {
            const { error } = adminAccountSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = categorySchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = ingredientSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = messageSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = messageSchemaUser.validate(req[param]);

            if (error) {
                console.log(error.message);
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
        return (req, _, next) => {
            const { error } = tagSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = stepSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = account_has_ingredientSchema.validate(req[param]);
            console.log("Test");

            if (error) {recipeSchema
                console.log(error.message);
                next(new APIError(error.message, 400));
            }
            else{
                console.log('ola');
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
        return (req, _, next) => {
            const { error } = recipe_has_ingredient_with_quantity.validate(req[param]);

            if (error) {
                console.log(error.message);
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
        return (req, _, next) => {
            const { error } = recipe_has_tag.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = recipeSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
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
        return (req, _, next) => {
            const { error } = loginSchema.validate(req[param]);

            if (error) {
                next(new APIError(error.message, 400));
            }
            else{

                next();
            }
        };
    }

};

module.exports = validationModule;