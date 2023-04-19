const debug = require("debug")("authentificationController");
const { Account } = require("../model");
const bcrypt = require('bcrypt');

const authentificationController = {

  async login(req, res, next) {
    const { email, password} = req.body;

    try{
      const account = await Account.getByEmail(email);
      if(!account) {
        next(new APIError('Couple login/mot de passe est incorrect.', 401));
      } else {
        const hasMatchingPassword = await bcrypt.compare(password, user.password);
        if(!hasMatchingPassword) {
          next(new APIError('Couple login/mot de passe est incorrect.', 401));
        }
      }
    }
    catch{
      next(new APIError(`Erreur interne : ${error}`,500));
    }
    

  }

};

module.exports= authentificationController;