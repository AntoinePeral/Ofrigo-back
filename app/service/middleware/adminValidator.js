const adminValidator ={
  /**
   * Verify if the user is an admin or not
   * @param {object} req used to get the JWT token from the headers
   * @param {*} _ 
   * @param {function} next run the next middleware
   */
  isAdmin(req, _, next) {
    if (req.user.role == 'admin') {
      next();
    }
    else {  
      next(new APIError("Vous n'êtes pas autorisé à accéder à cette page", 401));
    }
  }

};

module.exports= adminValidator;