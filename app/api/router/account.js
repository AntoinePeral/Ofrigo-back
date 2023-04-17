const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");

accountRouter.get("/account", account.getAllAccount);
accountRouter.get("/account/:id", account.getAccountById);

module.exports = accountRouter;