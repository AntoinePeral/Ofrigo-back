const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");

accountRouter.get("/account", account.getAllAccount);
accountRouter.get("/account/:id(\\d+)", account.getAccountById);
accountRouter.post("/register", account.addAccount);
accountRouter.put("/profile/:id(\\d+)", account.updateAccount);
accountRouter.delete("/profile/:id(\\d+)", account.deleteAccount);

module.exports = accountRouter;