const account = require("./account");
const category = require("./category");
const ingredient = require("./ingredient");
const message = require("./message");
const recipe = require("./recipe");
const tag = require("./tag");
const authentification = require("./authentification")

module.exports = { 
    account,
    authentification,
    category,
    ingredient,
    recipe,
    message,
    tag
};