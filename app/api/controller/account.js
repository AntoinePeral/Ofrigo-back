const debug = require("debug")("accountController");
const { Account } = require("../model");

const accountController = {

    /**
     * Get all account return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllAccount (_, res){
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
    async getAccountById (req, res){
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

    async addAccount (req, res, next) {
        const accountBody = req.body;
        const account = new Account(accountBody);

        if(account){
            debug(account);
            await account.add({'password': accountBody.password});
            debug(account);
            res.status(200).json(account);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async updateAccount (req, res, next) {
        const AccountId = req.params.id;
        const accountBody = req.body;
        let account = await Account.findOne(AccountId);

        if(account){
            debug(account);

            for (const key in accountBody) {
                account[key] = accountBody[key];
            }

            await account.update();
            debug(newAccount);
            const newAccount = await Account.findOne(AccountId);
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
    
};

module.exports= accountController;