const session = require('express-session');
const { Account } = require("../../api/model");

/**
 * Setup the session 
 */
const setupSession = session({
    secret: process.env.TOKEN_SECRET,
    resave: false,// Forcer la session a être enregistrée dans le session store, meme si la session n'a pas été modifiée pendant la requête
    saveUninitialized: false,// Forcer une session qui est "uninitialized" a être enregistrée. On la paramètre sur false lorsqu'on veut implémenter des sessions logins.
    cookie: { secure: false }//Pour le HTTP(false)/HTTPS(true)
});

/**
 * Add user to locals to be used on all the views
 * @param {req} req Express request
 * @param {res} res  Express response
 * @param {function} next call the next middleware
 */
async function addUserToLocals(req, res, next) {
    const userId = req.session.userId;
    const user = await Account.findOne(userId);

    if(user){
        user.password = undefined;
    }

    req.session.user = user;
    res.locals.userLogin = user;
    
    next();
}

module.exports = { setupSession, addUserToLocals };