const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../model");
const bcrypt = require('bcrypt');
const authentificationModule = require ("../../service/middleware/authToken")


const loginController = {

  /**
   * Allows a user to log in. Send a json JWT token and account
   * @param {object} req  Express req -req use request to get the body
   * @param {object} res Express response
   * @param {function} next use it to return an error
   * @returns {APIError} return error
   */
  async signIn(req, res, next) {
    const {email, password} = req.body;
    const account = await Account.findByEmail(email);
    console.log('je suis dans singin');
    console.log(account);
    console.log(req.body);
    
    if(!account) {
      console.log('je suis dans erreur account du login');
     return next(new APIError('Couple login/mot de passe est incorrect.', 400));
      
    } 
    else {
      console.log('je suis sortie de erreur');
      const hasMatchingPassword = await bcrypt.compare(password, account.password);

      if(!hasMatchingPassword) {
        return next(new APIError('Couple login/mot de passe est incorrect.', 401));
      } else{
        const accessToken = authentificationModule.generateAccessToken(account);
        res.status(200).json({
              accessToken,
              account  
          });
      }
    }
  },

  /**
   * Allows a admin to log in. Send a json JWT token and account
   * @param {object} req  Express req -req use request to get the body
   * @param {object} res Express response
   * @param {function} next use it to return an error
   * @returns {APIError} return error
   */
  async signInAdmin(req, res, next) {
    const {email, password} = req.body;
    const account = await Account.findByEmail(email);
    
    if(!account) {
      return next(new APIError('Couple login/mot de passe est incorrect.', 401));
    }
    const hasMatchingPassword = await bcrypt.compare(password, account.password);

    if(!hasMatchingPassword) {
      return next(new APIError('Couple login/mot de passe est incorrect.', 401));
    }
    if(account.role !== "admin"){
      return next(new APIError('Vous n\'avez pas l\'autorisation d\'accéder à cette page', 403));
    }
    else{
      const accessToken = authentificationModule.generateAccessToken(account);

      res.status(200).json({
            accessToken,
            account  
        });
    }
  },

};

module.exports= loginController;
