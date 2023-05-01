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
    const { email, password } = req.body;

    if(!email || !password){
      return res.render("login", {
        errorMessage: "Veuillez renseigner tous les champs",
        homeName: "Login",
        css: "/css/login.css",
      });
    }

    const account = await Account.findByEmail(email);

    if(!account){
      return res.render("login", {
        errorMessage: "Email ou mot de passe incorrect",
        homeName: "Login",
        css: "/css/login.css",
      });
    }

    const hasMatchingPassword = await bcrypt.compare(password, account.password);

    if(!hasMatchingPassword){
      return res.render("login", { 
        errorMessage: "Email ou mot de passe incorrect",
        homeName: "Login",
        css: "/css/login.css",
      });
    }
    else{
      req.session.userId = account.id;  
      res.redirect("/admin/home");
    }
  },

  loginAdmin (_, res, next) {
    res.render("login", {
      homeName: "Login",
      css: "/css/login.css",
      errorMessage: null
    });
  },

  logOut: (req, res) => {
    req.session.userId = null;
    res.redirect('/admin/login');
  },

};

module.exports= loginController;
