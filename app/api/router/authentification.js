const { Router } = require("express");
const authentificationRouter = Router();
const { authentification } = require("../controller");

authentificationRouter.post("/register", authentification.subscribe);


module.exports = authentificationRouter;