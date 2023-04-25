const { Router } = require("express");
const authentificationRouter = Router();
const { login } = require("../controller");
const validationRole = require("../../service/middleware/adminValidator");
const validationBody = require("../../service/validation/validate");

authentificationRouter.post("/login", validationBody.validateLogin('body'), login.signIn);
authentificationRouter.post("/admin/login", validationBody.validateLogin('body'), login.signInAdmin);

module.exports = authentificationRouter;