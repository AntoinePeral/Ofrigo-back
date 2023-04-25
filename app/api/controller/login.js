const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../model");
const bcrypt = require('bcrypt');
const authentificationModule = require ("../../service/middleware/authToken")


const loginController = {

  async signIn(req, res, next) {
    const {email, password} = req.body;
    const account = await Account.findByEmail(email);
    
    if(!account) {
      next(new APIError('Couple login/mot de passe est incorrect.', 401));
    } 
    else {
      const hasMatchingPassword = await bcrypt.compare(password, account.password);

      if(!hasMatchingPassword) {
        next(new APIError('Couple login/mot de passe est incorrect.', 401));
      } else{
        const accessToken = authentificationModule.generateAccessToken(account);
        res.status(200).json({
              accessToken,
              account  
          });
      }
    }
  },

  async signInAdmin(req, res, next) {
    const {email, password} = req.body;
    const account = await Account.findByEmail(email);
    
    if(!account) {
      next(new APIError('Couple login/mot de passe est incorrect.', 401));
    }
    
    const hasMatchingPassword = await bcrypt.compare(password, account.password);

    if(!hasMatchingPassword) {
      next(new APIError('Couple login/mot de passe est incorrect.', 401));
    }
    if(account.role !== "admin"){
      next(new APIError('Couple login/mot de passe est incorrect.', 401));
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
