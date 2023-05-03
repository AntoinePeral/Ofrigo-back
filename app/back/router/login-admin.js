const { Router } = require("express");
const authentificationRouter = Router();
const { loginAdmin, home } = require("../controller");
const validationBody = require("../../service/validation/validate");

authentificationRouter.get("/admin/login", loginAdmin.loginAdmin);
authentificationRouter.post("/admin/login", home.menu, validationBody.validateAdminLogin('body'), loginAdmin.signIn);
authentificationRouter.get("/admin/logout", loginAdmin.logOut);


module.exports = authentificationRouter;