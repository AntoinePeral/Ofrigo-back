const debug = require("debug")("accountController");
const APIError = require('../../service/error/APIError');
const { Account, Ingredient } = require("../model");
const bcrypt = require('bcrypt');
const authentificationModule = require ('../../service/middleware/authToken');

const accountController = {

    /**
     * Get one account user by his id. His id is provided from the JWT bearer token
     * @param {object} req  Express req -use the req to get the id and the token
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     */
    async getUserAccount(req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 403));
        }

        const account = await Account.findOne(req.user.id)

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            return next(new APIError("Bad request - Aucun utilisateur n'a été trouvé", 400));
        }
    },

    /**
     * Register a new account in DB
     * @param {object} req  Express req -use it to get the body object which contains the informations of the new account and the new JWT Token
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     * @returns {object} return an JWT token and the new account 
     */
    async addAccount (req, res, next) {
        const accountBody = req.body;

        const accountVerified = await Account.findByEmail(accountBody.email)
        if(accountVerified){
            return next(new APIError("Bad request - Le compte existe déjà", 400));
        }

        // Password encrypting
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(accountBody.password, salt);
        debug(hashedPassword);

        let account = new Account(accountBody);

        if(account){
            debug(account);
            account = await account.add({'password': hashedPassword});
            debug(account);
    
        }
        else{
            return next(new APIError("La création de compte a échoué", 500));
        }

        const accessToken = authentificationModule.generateAccessToken(account);
        
        return res.status(200).json({
            accessToken,
            account
        });
    },

    /**
     * Update informations account using the JWT Token ID. The password need to be verified to use this function
     * @param {object} req  Express req -use the req to get the body object which contains the informations of the updated account
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     */
    async updateAccount (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('Forbidden - User not provided', 403));
        }

        const accountBody = req.body;
        let account = await Account.findOne(req.user.id);

        if(account){
            debug(account);

            for (const value in accountBody) {
                account[value] = accountBody[value];
            }

            await account.update();
            const newAccount = await Account.findOne(req.user.id);
            debug(newAccount);
            res.status(200).json(newAccount);
        }
        else{
           return next(new APIError("La mise à jour du compte de l'utilsateur a échoué", 400));
        }
    },

    /**
     * Delete an account using the JWT token id
     * @param {object} req  Express req -used to verify if an id is send to the function
     * @param {object} res used to send a response to the client
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} error
     */
    async deleteAccount (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('Forbidden - User not provided', 403));
        }

        const response = await Account.delete(req.user.id);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("Le compte n'a pas pu être supprimé", 400)); 
        }
    },

    /**
     * Add an ingredient to an account using the id int the JWT token
     * @param {object} req  Express req -used to get the JWT token and to identify the user.id
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     * @returns {object} return json account 
     */
    async addIngredientToAccount (req, res, next){
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }

        const ingredient_id = req.body.ingredient_id;
        const ingredient = await Ingredient.findOne(ingredient_id);
        let account = await Account.findOne(req.user.id)
        let validation;

        if(account && ingredient){
            if(account.ingredient){
                for (const element of account.ingredient){
                    if(element.id === ingredient.id){
                        validation = false;
                        break;
                    }
                    else{
                        validation = true;
                    }
                }
            }
            else{
                validation = true;
            }
        }
        if(validation){
            await account.addIngredient(ingredient_id);
            account = await Account.findOne(req.user.id);
            return res.status(200).json(account);
        }
        else{
            next(new APIError("L'ingrédient fait déjà parti du compte", 400)); 
        }
    },

    /**
     * Delete an ingredient to an account using the id int the JWT token
     * @param {object} req  Express req -used to get the JWT token and to identify the user.id
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     */
    async deleteIngredientToAccount(req, res, next){
        if(!req.user.id) {
            return next(new APIError('Forbidden - User not provided', 403));
        }
        
        const ingredientId = req.params.id;
        let account = await Account.findOne(req.user.id);
        const ingredient = await Ingredient.findOne(ingredientId);
        let validation;

        if(account && ingredient){
            if(account.ingredient){
                for(const element of account.ingredient){
                    if(element.id == ingredientId){
                        validation = true;
                        break;
                    }
                    else{
                        validation = false;
                    }
                }
            }
        }
        if(validation){
            await account.removeIngredient(ingredientId);
            account = await Account.findOne(req.user.id);
            res.status(200).json(account);
        }
        else{
            return next(new APIError("Aucun ingrédient n'a été trouvé", 400)); 
        }
    },
    
};

module.exports= accountController;