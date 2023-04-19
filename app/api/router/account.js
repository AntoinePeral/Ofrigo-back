const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");

accountRouter.get("/account", account.getAllAccount);
accountRouter.get("/account/:id(\\d+)", account.getAccountById);

module.exports = accountRouter;