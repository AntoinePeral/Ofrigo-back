const debug = require("debug")("accountController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../model");

const adminController = {

       /**
     * Get all account return json Objects in array
     * @param {*} _ 
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error 
     */
       async getAllAccount (_, res, next){
        const account = await Account.findAll();

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            return next(new APIError("Aucun compte n'a été trouvé", 400));
        }
    },

    /**
     * Get one account by his id and return an json object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error 
     */
    async getAccountById (req, res, next){
        const accountId = req.params.id;
        const account = await Account.findOne(accountId);

        if(account){
            debug(account);
            res.status(200).json(account);
        }
        else{
            return next(new APIError("Aucun compte utilisateur n'a été trouvé", 400));
        }
    },
    /**
     * Delete one account by his id and return an string
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error 
     */
    async deleteAccount (req, res, next) {
        const accountId = req.params.id;
        const response = await Account.delete(accountId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("La suppression du compte a échoué", 400)); 
        }
    },

};

module.exports = adminController;