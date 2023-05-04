/**
 * Verify if the user is an admin using the session
 * @param {req} req Express request
 * @param {res} res  Express response
 * @param {function} next call the next middleware
 * @returns a redirect on the home page or the login page if the person is not an admin
 */
function isAdmin(req, res, next){
    if(!req.session.user){
        return res.redirect("/admin/login");
    }
    if(req.session.user.role !== "admin") {
        return res.redirect('/');
    }

    next();
}

module.exports = { isAdmin };