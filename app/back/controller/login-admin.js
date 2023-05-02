const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../../api/model");
const bcrypt = require('bcrypt');
const authentificationModule = require ("../../service/middleware/authToken")

const loginController = {

  /**
   * Allows a admin to log in
   * @param {*} req req use request to get the body
   * @param {*} res use it to response to the client
   * @param {*} next use it to return an error
   */
  async signIn(req, res, next) {
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
      return next(new APIError('Vous n\'êtes pas autorisé à rentre sur le site', 401));
    }
    else{
      const accessToken = authentificationModule.generateAccessToken(account);
      req.session.user = account;
      req.session.token = accessToken;     

      res.redirect("/admin/home");
    }
  },

  async loginAdmin (_, res, next) {
    res.render("login", {
      homeName: "Login",
      css: "/css/login.css",
    });
  },

};

module.exports= loginController;
