const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const APIError = require('../../service/error/APIError');
const { Account } = require("../../api/model");
const { locale } = require("dayjs");

const accountController = {

    async getAllAccountPage (_, res, next) {
        const accounts = await Account.findAll();    

        if(accounts){
            for(const account of accounts){
                account.created_at = dayjs(account.created_at).format('DD-MM-YYYY HH:mm:ss');
                account.updated_at = dayjs(account.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("accounts", {
                homeName: "Account",
                accounts,
                css: "/css/accounts.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getAccountPage (req, res, next) {
        const accountId = req.params.id;
        const account = await Account.findOne(accountId);

        if(account){
            account.created_at = dayjs(account.created_at).format('DD-MM-YYYY HH:mm:ss');
            account.updated_at = dayjs(account.updated_at).format('DD-MM-YYYY HH:mm:ss');
    
            if(account.message){
                for(const message of account.message){
                    message.created_at = dayjs(message.created_at).format('DD-MM-YYYY HH:mm:ss');
                    message.updated_at = dayjs(message.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }
            if(account.ingredient){
                for(const ingredient of account.ingredient){
                    ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
                    ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }

            console.log(account);

            res.render("account", {
                homeName: "Account",
                account,
                css: "/css/account.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getAdminPage (req, res, next) {
        const account = await Account.findOne(req.session.user.id);

        if(account){
            account.created_at = dayjs(account.created_at).format('DD-MM-YYYY HH:mm:ss');
            account.updated_at = dayjs(account.updated_at).format('DD-MM-YYYY HH:mm:ss');
    
            if(account.message){
                for(const message of account.message){
                    message.created_at = dayjs(message.created_at).format('DD-MM-YYYY HH:mm:ss');
                    message.updated_at = dayjs(message.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }
            if(account.ingredient){
                for(const ingredient of account.ingredient){
                    ingredient.created_at = dayjs(ingredient.created_at).format('DD-MM-YYYY HH:mm:ss');
                    ingredient.updated_at = dayjs(ingredient.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }

            console.log(account);

            res.render("account", {
                homeName: "Account",
                account,
                css: "/css/account.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async deleteAccount (req, res, next) {
        const accountId = req.params.id;
        const response = await Account.delete(accountId);

        if(response){
            res.redirect("/admin/account");
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async deleteMessageToAccount (req, res, next){
        const accountId = req.params.accountId;
        const messageId = req.params.messageId;
        const account = await Account.findOne(accountId);

        if(account){
            const response = await Account.removeMessageAdmin(account.email, messageId);

            if(response){
                res.redirect(`/admin/account/${accountId}`);
            }
            else{
                return next(new APIError("Not found", 404));
            }
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async deleteIngredientToAccount (req, res, next){
        const accountId = req.params.accountId;
        const ingredientId = req.params.ingredientId;
        const account = await Account.findOne(accountId);

        if(account){
            const response = await Account.removeIngredientAdmin(accountId, ingredientId);

            if(response){
                res.redirect(`/admin/account/${accountId}`);
            }
            else{
                return next(new APIError("Not found", 404));
            }
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getAddAdminAccountPage (req, res) {
        const accoutId = req.params.id;
        const account = await Account.findOne(accoutId);

        if(account){
            res.render("account-cu", {
                homeName: "Account",
                css: "/css/account-cu.css",
                errorMessage: null,
                account
            });
        }
        else{
            res.render("account-cu", {
                homeName: "Account",
                css: "/css/account-cu.css",
                errorMessage: null,
                account: null
            });
        }
    },

    /**
     * Register a new admin account in DB. Role is already defined as admin in this function
     * @param {object} req use the req to get the body object which contains the informations of the new account and the new JWT token
     * @param {object} res use to response to the client. Send an JSON object
     * @param {function} next call the APIError if an error is dectected
     * @returns {APIError} return an error
     */
    async addAdminAccount (req, res) {
        const accountBody = req.body;
        //accountBody.role = "admin";

        // Password encrypting
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(accountBody.password, salt);
        debug(hashedPassword);

        let account = new Account(accountBody);

        debug(account);
        account = await account.addAdmin({'password': hashedPassword});
        debug(account);
        
        res.redirect("/admin/account");
    },

    async updateAccount (req, res) {
        const accountBody = req.body;
        const accountId = req.params.id;
        //accountBody.role = "admin";

        let account = await Account.findOne(accountId);

        if(accountBody.password == accountBody.confirm_password){
            Object.entries(accountBody).forEach(([key, value]) => {
                if(key != "confirm_password"){
                    account[key] = value;
                }
            });
    
            // Password encrypting
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(accountBody.password, salt);
            debug(hashedPassword);
    
            await account.update({'password': hashedPassword});
            
            res.redirect("/admin/account");
        }
        else{
            res.render("account-cu", {
                homeName: "Account",
                css: "/css/account-cu.css",
                errorMessage: "Password incorrect",
                account
            });
        }
    },

};

module.exports = accountController;