const { Router } = require("express");
const authentificationRouter = Router();
const { login } = require("../controller");

authentificationRouter.post("/login", login.signIn);
authentificationRouter.post("/admin/login", login.signIn);

module.exports = authentificationRouter;