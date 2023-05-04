const debug = require("debug")("ingredientController");
const APIError = require('../../service/error/APIError');
const { Ingredient } = require("../model");

const ingredientController = {

    /**
     * Get all ingredients return json Objects in array
     * @param {*} _ 
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getAllIngredient (_, res, next){
        const ingredients = await Ingredient.findAll();
        const ingredientsToSend = ingredients.map(ingredient =>{
            return {
                ...ingredient,
                picture: `/public/picture/ingredient/${ingredient.picture}`
            }
        }); 

        if(ingredientsToSend){
            debug(ingredientsToSend);
            res.status(200).json(ingredientsToSend);
        }
        else{
            return next(new APIError("Internal server error", 500));
        }
    },

    /**
     * Get one ingredient by his id return json Object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getIngredientById (req, res, next){
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findOne(ingredientId);

        ingredient.picture = `/public/picture/ingredient/${ingredient.picture}`;

        if(ingredient){
            debug(ingredient);
            res.status(200).json(ingredient);
        }
        else{
            return next(new APIError("Aucun ingrédient n'a été trouvé", 400));
        }
    },

    /**
     * Get all ingredients of a user account and return json Objects in array
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getAllIngredientUser (req, res, next){
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }

        const ingredient = await Ingredient.findAllIngredientUser(req.user.id);

        if(ingredient){
            debug(ingredient);
            res.status(200).json(ingredient);
        }
        else{
            return next(new APIError("Aucun ingrédient trouvé pour cet utilisateur", 400));
        }
    },

    /**
     * Get one ingredients of a user account and return json Objects in array
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getOneIngredientUser (req, res, next){
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }

        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findOneIngredientUser(req.user.id, ingredientId);

        if(ingredient){
            debug(ingredient);
            res.status(200).json(ingredient);
        }
        else{
            return next(new APIError("L'ingrédient n'a pas été trouvé", 400));
        }
    },

    /**
     * Add a ingredient and return an object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async addIngredient (req, res, next) {
        const ingredientBody = req.body;
        const ingredient = new Ingredient(ingredientBody);

        if(ingredient){
            debug(ingredient);
            await ingredient.add();
            debug(ingredient);
            res.status(200).json(ingredient);
        }
        else{
            return next(new APIError("L'ingrédient est déjà enregistré dans le profile", 500));
        }
    },

    /**
     * Update a ingredient and return an object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async updateIngredient (req, res, next) {
        const ingredientId = req.params.id;
        const ingredientBody = req.body;
        let ingredient = await Ingredient.findOne(ingredientId);

        if(ingredient){
            debug(ingredient);

            for (const key in ingredientBody) {
                ingredient[key] = ingredientBody[key];
            }

            await ingredient.update();
            const newIngredient = await Ingredient.findOne(ingredientId);
            debug(newIngredient);
            res.status(200).json(newIngredient);
        }
        else{
            return next(new APIError("La mise à jour de l'ingrédient a échoué", 400));
        }
    },

    /**
     * Delete one ingredient by his id and return an string
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async deleteIngredient (req, res, next) {
        const ingredientId = req.params.id;
        const response = await Ingredient.delete(ingredientId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("La suppression de l'ingrédient a échoué", 400));
        }
    },
    
};

module.exports= ingredientController;