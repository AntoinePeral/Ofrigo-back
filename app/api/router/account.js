const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require ('../../service/middleware/authToken');

// Admin
//accountRouter.get("/account", account.getAllAccount);
//accountRouter.get("/account/:id(\\d+)", account.getAccountById);
//accountRouter.get("/me/profile",authentificationModule.authenticateToken, account.getUserAccount);
//accountRouter.put("/profile/:id(\\d+)", authentificationModule.authenticateToken,validationModule.validateUserAccount('body'), account.updateAccount);
//accountRouter.delete("/profile/:id(\\d+)", authentificationModule.authenticateToken, account.deleteAccount);

// User
accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.get("/me/profile", middleware.authenticateToken, account.getUserAccount);
accountRouter.put("/profile/:id(\\d+)", middleware.authenticateToken, validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/profile/:id(\\d+)", middleware.authenticateToken, account.deleteAccount);

module.exports = accountRouter;