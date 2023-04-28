const debug = require("debug")("ingredientController");
const APIError = require('../../service/error/APIError');
const { Ingredient } = require("../model");

const ingredientController = {

    /**
     * Get all ingredients return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllIngredient (_, res, next){
        const ingredients = await Ingredient.findAll();
        const ingredientsToSend = ingredients.map(ingredient =>{
            return {
                ...ingredient,
                picture: `/public/picture/ingredient/${ingredient.picture}`
            }
        }); 
        console.log("test",ingredients);

        if(ingredientsToSend){
            debug(ingredientsToSend);
            res.status(200).json(ingredientsToSend);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one ingredient by his id return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getIngredientById (req, res, next){
        const ingredientId = req.params.id;
        const ingredient = await Ingredient.findOne(ingredientId);
        // const ingredientToSend = ingredient.map(ingredient =>{
        //     return {
        //         ...ingredient,
        //         picture: `/public/picture/ingredient/${ingredient.picture}`
        //     }
        // }); 
        ingredient.picture = `/public/picture/ingredient/${ingredient.picture}`;

        if(ingredient){
            debug(ingredient);
            res.status(200).json(ingredient);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get all ingredients of a user account and return json Objects in array
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
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
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one ingredients of a user account and return json Objects in array
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
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
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Add a ingredient and return an object
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
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
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async updateIngredient (req, res, next) {
        const ingredientId = req.params.id;
        const ingredientBody = req.body;
        let ingredient = await Ingredient.findOne(ingredientId);
        console.log(ingredient);

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
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Delete one ingredient by his id and return an string
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async deleteIngredient (req, res, next) {
        const ingredientId = req.params.id;
        const response = await Ingredient.delete(ingredientId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },
    
};

module.exports= ingredientController;