const { Router } = require("express");
const authentificationRouter = Router();
const { login } = require("../controller");
const validationRole = require("../../service/middleware/adminValidator");

authentificationRouter.post("/login", login.signIn);
authentificationRouter.post("/admin/login", validationRole.isAdmin, login.signIn);

module.exports = authentificationRouter;