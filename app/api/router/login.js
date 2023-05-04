const { Router } = require("express");
const authentificationRouter = Router();
const { login } = require("../controller");
const validationBody = require("../../service/validation/validate");

authentificationRouter.post("/login", validationBody.validateLogin('body'), login.signIn);

module.exports = authentificationRouter;