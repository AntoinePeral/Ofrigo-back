const { Router } = require("express");
const accountRouter = Router();
const { account, admin } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.get("/me/profile", middleware.authenticateToken, account.getUserAccount);
accountRouter.get("/admin/profile", middleware.authenticateToken, admin.getAllAccount);
accountRouter.get("/admin/profile/:id(\\d+)", middleware.authenticateToken, admin.getAccountById);
accountRouter.delete("/admin/profile/:id(\\d+)", middleware.authenticateToken, admin.deleteAccount);
accountRouter.put("/me/profile", middleware.authenticateToken, validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/me/profile", middleware.authenticateToken, account.deleteAccount);
accountRouter.post('/me/profile/ingredient', middleware.authenticateToken, validationModule.validateAccount_has_ingredientSchema('body'), account.addIngredientToAccount);
accountRouter.delete('/me/profile/ingredient/:id(\\d+)', middleware.authenticateToken, account.deleteIngredientToAccount);

module.exports = accountRouter;