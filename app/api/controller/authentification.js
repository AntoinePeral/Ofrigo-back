const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../model");
const bcrypt = require('bcrypt');

const authentificationController = {

  async login(req, res, next) {
    const {email, password} = req.body;
    console.log(req.body);

    try{
      const account = await Account.getByEmail(email);
      console.log(account);

      if(!account) {
        next(new APIError('Couple login/mot de passe est incorrect.', 401));
      } else {
        const hasMatchingPassword = await bcrypt.compare(password, account.password);
        console.log(hasMatchingPassword);

      if(!hasMatchingPassword) {
        next(new APIError('Couple login/mot de passe est incorrect.', 401));
      }
  
      }
    }
    catch (error){
      next(new APIError(`Erreur interne : ${error}`,500));
    }
    

  }

};

module.exports= authentificationController;