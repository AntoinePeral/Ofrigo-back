const { Router } = require("express");
const accountRouter = Router();
const { account, admin } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');

//Public
accountRouter.post("/register", validationBody.validateUserAccount('body'), account.addAccount);

//User
accountRouter.get("/me/profile", authentification.authenticateToken, account.getUserAccount);
accountRouter.put("/me/profile", authentification.authenticateToken, validationBody.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/me/profile", authentification.authenticateToken, account.deleteAccount);
accountRouter.post('/me/profile/ingredient', authentification.authenticateToken, validationBody.validateAccount_has_ingredientSchema('body'), account.addIngredientToAccount);
accountRouter.delete('/me/profile/ingredient/:id(\\d+)', authentification.authenticateToken, account.deleteIngredientToAccount);

module.exports = accountRouter;