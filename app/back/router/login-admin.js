const { Router } = require("express");
const authentificationRouter = Router();
const { loginAdmin } = require("../controller");
const validationBody = require("../../service/validation/validate");

authentificationRouter.get("/admin/login", loginAdmin.getLoginAdmin);
authentificationRouter.post("/admin/login", validationBody.validateLogin('body'), loginAdmin.signInAdmin);

module.exports = authentificationRouter;