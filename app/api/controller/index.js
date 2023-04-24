const account = require("./account");
const admin = require("./admin");
const category = require("./category");
const ingredient = require("./ingredient");
const message = require("./message");
const recipe = require("./recipe");
const tag = require("./tag");
const login = require("./login")

module.exports = { 
    account,
    admin,
    login,
    category,
    ingredient,
    recipe,
    message,
    tag
};