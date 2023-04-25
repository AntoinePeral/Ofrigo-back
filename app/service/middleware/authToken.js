const jwt = require('jsonwebtoken');
const APIError = require('../error/APIError');
require('dotenv').config();

const authentificationModule = {
  generateAccessToken(account) {
    return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return (new APIError("Autorisation refusée, le token est manquant", 401));
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next(new APIError("Le token est érroné", 401));
      }
      req.user = decoded;
      next();
    });
  }

};

module.exports = authentificationModule;