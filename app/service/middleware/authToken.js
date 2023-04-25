const jwt = require('jsonwebtoken');
const APIError = require('../error/APIError');
require('dotenv').config();

const authentificationModule = {

    generateAccessToken(account){
        return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7200s' });
    },

    authenticateToken(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token){
            //console.log("lol2");
            //console.log(new APIError("Le token est érroné", 401));
            //res.json(new APIError("Le token est érroné", 401, "Le token est érroné"));
            next(new APIError("Le token est érroné", 401));
            //console.log("What");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log("lol3");
                next(new APIError("Le token est érroné", 401));
            }

            req.user = decoded;
            next();
            console.log("lol5");
        });
    },
    
};

module.exports = authentificationModule;