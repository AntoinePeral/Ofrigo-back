const debug = require("debug")("authentificationController");
const { Account } = require("../model");

const authentificationController = {
    async addAccount (req, res){
        const accountBody = req.body;
        const account = new Account(accountBody);
        debug(account);
    
        if (account) {
            await account.add();
            debug(account);
    
            res.status(200).json(account);
        }
        else {
            console.log(error);
        }
    },

};

module.exports= authentificationController;