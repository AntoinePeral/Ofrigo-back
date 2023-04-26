const adminValidator = {

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