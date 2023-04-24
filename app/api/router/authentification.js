const { Router } = require("express");
const authentificationRouter = Router();
const { authentification } = require("../controller");

authentificationRouter.post("/login", authentification.login);

module.exports = authentificationRouter;