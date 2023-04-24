const account = require("./account");
const admin = require ('./adminAccount');
const authentification = require("./authentification");
const category = require("./category");
const ingredient = require("./ingredient");
const message = require("./message");
const recipe = require("./recipe");
const tag = require("./tag");

module.exports = { 
    account,
    admin,
    authentification,
    category,
    ingredient,
    recipe,
    message,
    tag
};