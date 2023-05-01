const { Router } = require("express");
const authentificationRouter = Router();
const { loginAdmin, home } = require("../controller");
const validationBody = require("../../service/validation/validate");

authentificationRouter.get("/admin/login", loginAdmin.loginAdmin);
authentificationRouter.post("/admin/login", /*validationBody.validateLogin('body')*/ home.menu, loginAdmin.signIn);

module.exports = authentificationRouter;