const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Account } = require("../../api/model");

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
        let account;

        if(accountId){
            account = await Account.findOne(accountId);
        }
        if(req.session.user){
            account = await Account.findOne(req.session.user.id);
        }
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

};

module.exports = accountController;