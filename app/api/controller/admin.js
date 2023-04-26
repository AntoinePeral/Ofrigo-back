const debug = require("debug")("accountController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../model");

const adminController = {

       /**
     * Get all account return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
       async getAllAccount (_, res, next){
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
     * @param {*} next use it to return an error
     */
    async getAccountById (req, res, next){
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
    /**
     * Delete one account by his id and return an string
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
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

module.exports = adminController;