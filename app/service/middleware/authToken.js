const jwt = require('jsonwebtoken');
const APIError = require('../error/APIError');
require('dotenv').config();

const authentificationModule = {
  /**
   * Generate a new JWT Token.
   * @param {object} account the new account information
   * @returns The new JWT Token
   */
  generateAccessToken(account) {
    return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7200s' });
  },

  /**
   * Verify if the JWT token is valid
   * @param {object} req  Express req -used to get the headers and the token JWT
   * @param {*} _ 
   * @param {function} next Run the next middleware
   * @returns {APIError} error if an error is detected
   */
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return next (new APIError("Autorisation refusée, le token est manquant", 401));
    } 
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(new APIError("Le token est érroné", 401));
      }
      req.user = decoded;
      next();
    });
  }

};

module.exports = authentificationModule;