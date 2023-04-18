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
    
};

module.exports= accountController;