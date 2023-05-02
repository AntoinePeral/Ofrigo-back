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
            return next(new APIError("Not found", 404));
        }
    },

    async deleteAccount (req, res) {
        const accountId = req.params.id;
        await Account.delete(accountId);

        res.redirect("/admin/account");
    },

    async deleteMessageToAccount (req, res){
        const accountId = req.params.accountId;
        const messageId = req.params.messageId;

        const account = await Account.findOne(accountId);

        await Account.removeMessageAdmin(account.email, messageId);

        res.redirect(`/admin/account/${accountId}`);
    },

    async deleteIngredientToAccount (req, res){
        const accountId = req.params.accountId;
        const ingredientId = req.params.ingredientId;

        await Account.removeIngredientAdmin(accountId, ingredientId);

        res.redirect(`/admin/account/${accountId}`);
    },

};

module.exports = accountController;