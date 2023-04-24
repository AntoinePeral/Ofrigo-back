const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require ('../../service/middleware/authToken');

// User
accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.get("/me/profile", middleware.authenticateToken, account.getUserAccount);
accountRouter.get("/profile", account.getAllAccount);
accountRouter.get("/profile/:id(\\d+)", account.getAccountById);
accountRouter.put("/profile/:id(\\d+)", middleware.authenticateToken, validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/profile/:id(\\d+)", middleware.authenticateToken, account.deleteAccount);
accountRouter.post('/profile/ingredient', middleware.authenticateToken, account.addIngredientToAccount);
accountRouter.delete('/profile/ingredient/:id(\\d+)', middleware.authenticateToken, account.deleteIngredientToAccount);

module.exports = accountRouter;