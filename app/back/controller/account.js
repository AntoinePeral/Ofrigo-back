const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const APIError = require('../../service/error/APIError');
const { Account } = require("../../api/model");
const { locale } = require("dayjs");

const accountController = {

    /**
     * Render list of all accounts
     * @param {*} _ 
     * @param {res} res Express response
     * @param {function} next call the next middleware (404)
     */
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
            next();
        }
    },

    /**
     * Render a single account profile page
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     */
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

            res.render("account", {
                homeName: "Account",
                account,
                css: "/css/account.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Render an admin profile page
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     */
    async getAdminPage (req, res, next) {
        const name = req.params.name;
        const account = await Account.findOne(req.session.user.id);

        if(account && name == account.first_name+ '-' + account.last_name){
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

            res.render("account", {
                homeName: "Account",
                account,
                css: "/css/account.css",
            });
        }
        else{
            next();
        }
    },

    /**
     * Delete an existing account
     * @param {req} req Express request
     * @param {res} res  Express response
     *  @param {function} next call the next middleware (404)
     */
    async deleteAccount (req, res, next) {
        const accountId = req.params.id;
        const response = await Account.delete(accountId);

        if(response){
            res.redirect("/admin/account");
        }
        else{
            next();
        }
    },

    /**
     * Delete a message from an account
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     * @returns {APIError} error
     */
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
                next();
            }
        }
        else{
            return next(new APIError("La suppression d'un message a échoué", 400));
        }
    },

    /**
     * Delete an ingredient from an account
     * @param {req} req Express request
     * @param {res} res  Express response
     * @param {function} next call the next middleware (404)
     * @returns {APIError} error
     */
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
                next();
            }
        }
        else{
            return next(new APIError("La suppression d'un ingrédient a échoué", 400));
        }
    },
    /**
     * Render a page to create/update account as admin
     * @param {req} req Express request
     * @param {res} res  Express response
     */
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
     * Register a new account as admin in DB.
     * @param {object} req  Express req -use the req to get the body object which contains the informations of the new account
     * @param {object} res Express res -use to response to the client. Send an JSON object
     */
    async addAdminAccount (req, res) {
        const accountBody = req.body;
        const validateAccount = await Account.findByEmail(accountBody.email);

        if(validateAccount){
            res.render("account-cu", {
                homeName: "Account",
                css: "/css/account-cu.css",
                errorMessage: "Ce compte existe dèjà",
                account: null
            });
        }
        else{
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
        }
    },

    /**
     * Update an account as admin
     * @param {req} req Express request
     * @param {res} res  Express response
     */
    async updateAccount (req, res) {
        const accountBody = req.body;
        const accountId = req.params.id;

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