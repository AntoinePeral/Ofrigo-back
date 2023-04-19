const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");

accountRouter.get("/account", account.getAllAccount);
accountRouter.get("/account/:id", account.getAccountById);
accountRouter.post("/register", account.addAccount);
accountRouter.put("/profile/:id", account.updateAccount);
accountRouter.delete("/profile/:id", account.deleteAccount);

module.exports = accountRouter;