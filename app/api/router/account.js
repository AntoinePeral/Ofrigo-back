const { Router } = require("express");
const accountRouter = Router();
const { account, admin } = require("../controller");
const validationModule = require("../../service/validation/validate");
const {adminValidator, authToken} = require('../../service/middleware');

accountRouter.post("/register", validationModule.validateUserAccount('body'), account.addAccount);
accountRouter.get("/me/profile", authToken.authenticateToken, account.getUserAccount);
accountRouter.get("/admin/profile", authToken.authenticateToken, admin.getAllAccount);
accountRouter.get("/admin/profile/:id(\\d+)", authToken.authenticateToken, admin.getAccountById);
accountRouter.delete("/admin/profile/:id(\\d+)", authToken.authenticateToken, admin.deleteAccount);
accountRouter.put("/me/profile", authToken.authenticateToken, validationModule.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/me/profile", authToken.authenticateToken, account.deleteAccount);
accountRouter.post('/me/profile/ingredient', authToken.authenticateToken, validationModule.validateAccount_has_ingredientSchema('body'), account.addIngredientToAccount);
accountRouter.delete('/me/profile/ingredient/:id(\\d+)', authToken.authenticateToken, account.deleteIngredientToAccount);

module.exports = accountRouter;