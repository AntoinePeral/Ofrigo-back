const debug = require("debug")("accountController");
const APIError = require('../../service/error/APIError');
const { Account, Ingredient } = require("../model");
const bcrypt = require('bcrypt');
const authentificationModule = require ('../../service/middleware/authToken');

const accountController = {

    /**
     * Get all account return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllAccount (_, res, next){
        const account = await Account.findAll();

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one account by his id and return an json object
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     */
    async getAccountById (req, res, next){
        const accountId = req.params.id;
        const account = await Account.findOne(accountId);

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },
    async getUserAccount(req, res, next) {
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }
        const account = await Account.findOne(req.user.id)

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async addAccount (req, res, next) {
        const accountBody = req.body;

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
            next(new APIError("Bad request", 500));
        }

        const accessToken = authentificationModule.generateAccessToken(account);
        
        return res.status(200).json({
            accessToken,
            account
        });
    },

    async updateAccount (req, res, next) {
        const AccountId = req.params.id;
        const accountBody = req.body;
        let account = await Account.findOne(AccountId);

        if(account){
            debug(account);

            for (const value in accountBody) {
                account[value] = accountBody[value];
            }

            await account.update();
            const newAccount = await Account.findOne(AccountId);
            debug(newAccount);
            res.status(200).json(newAccount);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async deleteAccount (req, res, next) {
        const accountId = req.params.id;
        const response = await Account.delete(accountId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            next(new APIError("Bad request", 500)); 
        }
    },

    async addIngredientToAccount (req, res, next){
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }
        const ingredient_id = req.body.ingredient_id;
        const ingredient = await Ingredient.findOne(ingredient_id);
        const account = await Account.findOne(req.user.id)
        let validation;

        if(account && ingredient){
            if(account.ingredient){
                for (const element of account.ingredient){
                    if(element.id === ingredient.id){
                        validation = false;
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
        console.log(validation);
        if(validation){
            await account.addIngredient(ingredient_id);
            return res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500)); 
        }
    },

    async deleteIngredientToAccount(req, res, next){
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }
        const ingredientId = req.params.id;
        let account = await Account.findOne(req.user.id);
        const ingredient = await Ingredient.findOne(ingredientId);
        let validation;

        if(account && ingredient){
            if(account.ingredient){
                for(const ingredient of account.ingredient){
                    if(ingredient.id == ingredientId){
                        validation = true;
                    }
                    else{
                        validation = false;
                    }
                }
            }
        }
        if(validation){
            await account.removeIngredient(ingredientId);
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500)); 
        }
    },
    
};

module.exports= accountController;