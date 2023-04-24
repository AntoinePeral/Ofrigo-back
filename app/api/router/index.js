const account = require("./account");
<<<<<<< HEAD
const authentification = require("./login");
=======
const admin = require ('./adminAccount');
const authentification = require("./authentification");
>>>>>>> b1cab09f643176ee47c9f511a9faef9fc4ed3b3c
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