const debug = require("debug")("authentificationController");
const APIError = require('../../service/error/APIError');
const { Account } = require("../../api/model");
const bcrypt = require('bcrypt');
const authentificationModule = require ("../../service/middleware/authToken")

const loginController = {

  /**
   * Render the sign in page - Allows a admin to log in
   * @param {object} req  Express req -req use request to get the body
   * @param {object} res Express response
   */
  async signIn(req, res) {
    const { email, password } = req.body;

    if(!email || !password){
      return res.render("login", {
        errorMessage: "Please complete all fields",
        homeName: "Login",
        css: "/css/login.css",
      });
    }

    const account = await Account.findByEmail(email);

    if(!account){
      return res.render("login", {
        errorMessage: "Incorrect email or password",
        homeName: "Login",
        css: "/css/login.css",
      });
    }

    const hasMatchingPassword = await bcrypt.compare(password, account.password);

    if(!hasMatchingPassword){
      return res.render("login", { 
        errorMessage: "Incorrect email or password",
        homeName: "Login",
        css: "/css/login.css",
      });
    }
    else{
      req.session.userId = account.id;  
      res.redirect("/admin/home");
    }
  },

  /**
   * Render the login admin page
   * @param {*} _ 
   * @param {res} res  Express response 
   */
  loginAdmin (_, res) {
    res.render("login", {
      homeName: "Login",
      css: "/css/login.css",
      errorMessage: null
    });
  },

  /**
   * Logout the admin
   * @param {req} req Express request
   * @param {res} res  Express response 
   */
  logOut: (req, res) => {
    req.session.userId = null;
    res.redirect('/admin/login');
  },

};

module.exports= loginController;
