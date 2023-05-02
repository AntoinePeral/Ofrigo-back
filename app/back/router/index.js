const loginAdmin = require("./login-admin");
const homeRouter = require('./home');
const categoryRouter = require('./category');
const ingredientRouter = require("./ingredient");
const messageRouter = require("./message");
const tagRouter = require("./tag");
const accountRouter = require("./account");
const recipeRouter = require("./recipe");

module.exports = {
    loginAdmin,
    homeRouter,
    categoryRouter,
    ingredientRouter,
    messageRouter,
    tagRouter,
    accountRouter,
    recipeRouter
};