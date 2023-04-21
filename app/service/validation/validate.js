const APIError = require("../error/APIError");
const { 
    adminAccountSchema,
    userAccountSchema, 
    categorySchema, 
    ingredientSchema,
    messageSchema,
    tagSchema,
    stepSchema,
    account_has_ingredientSchema,
    recipe_has_ingredient_with_quantity,
    recipe_has_tag
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

    validateAccount_has_ingredientSchema(param){
        return (req, _, next) => {
            const { error } = account_has_ingredientSchema.validate(req[param]);

            if (error) {
                console.log(error.message);
                next(new APIError(error.message, 400));
            }
            else{
                next();
            }
        };
    },

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

};

module.exports = validationModule;