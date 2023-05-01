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