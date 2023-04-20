const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");
const validationModule = require("../../service/validation/validate");

accountRouter.get("/account", account.getAllAccount);
accountRouter.get("/account/:id(\\d+)", account.getAccountById);
accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.put("/profile/:id(\\d+)", validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/profile/:id(\\d+)", account.deleteAccount);

module.exports = accountRouter;