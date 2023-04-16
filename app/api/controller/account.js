const debug = require("debug")("accountController");
const { Account } = require("../model");

const accountController = {

    async getAllAccount (_, res){
        try{
            const account = await Account.findAll();
            debug(account);

            res.status(200).json(account);
        }catch(error){
            console.log(error);
        }
    },

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