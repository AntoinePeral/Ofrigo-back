const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require ('../../service/middleware/authToken');

// Admin
<<<<<<< HEAD
// accountRouter.get("/account", account.getAllAccount);
// accountRouter.get("/account/:id(\\d+)", account.getAccountById);
// accountRouter.get("/me/profile",authentificationModule.authenticateToken, account.getUserAccount);
// accountRouter.put("/profile/:id(\\d+)", authentificationModule.authenticateToken,validationModule.validateUserAccount('body'), account.updateAccount);
// accountRouter.delete("/profile/:id(\\d+)", authentificationModule.authenticateToken, account.deleteAccount);
=======
//accountRouter.get("/account", account.getAllAccount);
//accountRouter.get("/account/:id(\\d+)", account.getAccountById);
//accountRouter.get("/me/profile",authentificationModule.authenticateToken, account.getUserAccount);
//accountRouter.put("/profile/:id(\\d+)", authentificationModule.authenticateToken,validationModule.validateUserAccount('body'), account.updateAccount);
//accountRouter.delete("/profile/:id(\\d+)", authentificationModule.authenticateToken, account.deleteAccount);
>>>>>>> 1cd0aae43bb6de44ff4600a0c787dfd1a6e0dbc2


// User
accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.get("/me/profile",authentificationModule.authenticateToken, account.getUserAccount);
accountRouter.put("/profile/:id(\\d+)", authentificationModule.authenticateToken,validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/profile/:id(\\d+)", authentificationModule.authenticateToken, account.deleteAccount);

module.exports = accountRouter;