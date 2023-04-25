const debug = require("debug")("accountController");
const APIError = require('../../service/error/APIError');
const { Account, Ingredient } = require("../model");
const bcrypt = require('bcrypt');
const authentificationModule = require ('../../service/middleware/authToken');

const accountController = {

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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * Le MDP doit être indiqué pour valider le schéma --> EN cas d'update du profile
     */
    async updateAccount (req, res, next) {
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
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
            next(new APIError("Bad request", 500));
        }
    },

    async deleteAccount (req, res, next) {
        if(!req.user.id) {
            res.status(400).json({error: "User not provided."})
        }

        const response = await Account.delete(req.user.id);

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
            return  res.status(200).json(account);
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
            account = await Account.findOne(req.user.id)
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500)); 
        }
    },
    
};

module.exports= accountController;