const APIError = require ('../error/APIError')

const adminValidator ={
  /**
   * Verify if the user is an admin or not
   * @param {object} req used to get the JWT token from the headers
   * @param {*} _ 
   * @param {function} next run the next middleware
   */
  isAdmin(req, _, next) {
// Le ? permet ici d'éviter l'erreur de undefined si l'un des deux rôle l'est
    if (req.user?.role === 'admin' || req.session?.user?.role==='admin') {
      next();
    }
    else {  
      next(new APIError("Vous n'êtes pas autorisé à accéder à cette page", 401));
    }
  }

};

module.exports= adminValidator;