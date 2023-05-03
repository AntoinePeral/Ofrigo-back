const session = require('express-session');
const { Account } = require("../../api/model");

const setupSession = session({
    secret: process.env.TOKEN_SECRET,
    resave: false,// Forcer la session a être enregistrée dans le session store, meme si la session n'a pas été modifiée pendant la requête
    saveUninitialized: false,// Forcer une session qui est "uninitialized" a être enregistrée. On la paramètre sur false lorsqu'on veut implémenter des sessions logins.
    cookie: { secure: false }//Pour le HTTP(false)/HTTPS(true)
});

async function addUserToLocals(req, res, next) {
    const userId = req.session.userId;
    const user = await Account.findOne(userId);

    if(user){
        user.password = undefined;
    }

    req.session.user = user;
    res.locals.userLogin = user;

    console.log("locals",res.locals.userLogin);
    // console.log("locals2 avec req",req.locals.userLogin.email);
    
    next();
}

module.exports = { setupSession, addUserToLocals };