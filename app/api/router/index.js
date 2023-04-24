const account = require("./account");
const authentification = require("./login");
const category = require("./category");
const ingredient = require("./ingredient");
const message = require("./message");
const recipe = require("./recipe");
const tag = require("./tag");

module.exports = { 
    account,
    authentification,
    category,
    ingredient,
    recipe,
    message,
    tag
};