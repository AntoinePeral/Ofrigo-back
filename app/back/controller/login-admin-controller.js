const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account, Message, Ingredient, Recipe, Tag, Category } = require("../../api/model");
const bcrypt = require('bcrypt');
const authentificationModule = require ("../../service/middleware/authToken")

const loginController = {

  /**
   * Allows a admin to log in
   * @param {*} req req use request to get the body
   * @param {*} res use it to response to the client
   * @param {*} next use it to return an error
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
      return next(new APIError('Couple login/mot de passe est incorrect.', 401));
    }
    else{
      const accessToken = authentificationModule.generateAccessToken(account);
      req.session.token = accessToken;

      const itemsMenu = [ Category.tableName, Ingredient.tableName, Message.tableName, Recipe.tableName,  Tag.tableName ];       

      res.redirect("/admin/home")
      // res.redirect("/admin/home", {
      //   homeName: "HomePage",
      //   itemsMenu,
      //   account,
      //   accessToken
      // })
    }
  },

  async getLoginAdmin (_, res, next) {
    const ingredient = await Ingredient.findOne(1);

    res.render("loginAdmin", {
      homeName: "LoginPage",
      ingredient
    });
  },

};

module.exports= loginController;
