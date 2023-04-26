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
   * @param {*} req used to get the headers and the token JWT
   * @param {*} _ 
   * @param {*} next Run the next middleware
   * @returns {APIError} error if an error is detected
   */
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Etape 1 ON RENTRE DANS LE TOKEN');
    if (!token) {
      return next (new APIError("Autorisation refusée, le token est manquant", 401));
    } 
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log('Etape 2 VERIFY' );
        return next(new APIError("Le token est érroné", 401));
        console.log('Etape 2 qui ne devrait pas apparaitre');
      }
      console.log('Etape 3 avec le next quand le verify est bon');
      req.user = decoded;
      next();
    });
  }

};

module.exports = authentificationModule;