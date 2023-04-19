const debug = require("debug")("accountController");
const { Account } = require("../model");

const accountController = {
    /**
     * Get all account return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllAccount (_, res){
        try{
            const account = await Account.findAll();
            debug(account);

            res.status(200).json(account);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one account by his id and return an json object
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     */
    async getAccountById (req, res){
        const accountId = req.params.id;

        try{
            const account = await Account.findOne(accountId);
            debug(account);

            res.status(200).json(account);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Add account to data
     * @param {*} req request
     * @param {*} res response
     */
    async addAccount (req, res, next){
        const accountBody = req.body;
        const account = new Account(accountBody);
        debug(account);
    
        if (account) {
            await account.add(account);
            debug(account);
    
            res.status(200).json(account);
            // debug(res.json(account));
        }
        else {
            // console.log(error);
            console.log("erreur");
        }
    },

    /**
     * Update post
     * @param {Object} req - request
     * @param {Object} res - response
     * @param {*} next 
     */
    async updateAccount (req, res, next) {
        const AccountId = req.params.id;
        const accountBody = req.body;
        let account = await Post.findById(accountBody);
        debug(account);

        if (account) {
            for (const key in req.body) {
                account[key] = req.body[key];
            }
            debug(account);
            await account.update();
            const account = await Account.findById(AccountId);
            debug(account);
            res.status(200).json(account);
        }
        else {
            // next(new APIError("Bad request", 500));
            console.log("erreur");
        }
    },

    /**
     * Delete Account
     * @param {Object} req - request
     * @param {Object} res - response
     * @param {*} next 
     */
    async deleteAccount (req, res, next) {
        const accountId = req.params.id;
        const response = await Account.delete(accountId);
        debug(response);

        if (response) {
            res.status(200).json('Succes');
        }
        else {
            // next(new APIError("Bad request", 500));
            console.log("erreur");
        }
    },
    
};

module.exports= accountController;