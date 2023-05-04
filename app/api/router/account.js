const { Router } = require("express");
const accountRouter = Router();
const { account } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');

//Public
/** Create a user account - Use  */
accountRouter.post("/register", validationBody.validateUserAccount('body'), account.addAccount);

//User
/** Get user account */
accountRouter.get("/me/profile", authentification.authenticateToken, account.getUserAccount);
/** Update account as user */
accountRouter.put("/me/profile", authentification.authenticateToken, validationBody.validateUserAccount('body'), account.updateAccount);
/** Delete account as user */
accountRouter.delete("/me/profile", authentification.authenticateToken, account.deleteAccount);
/** Add ingredient to the account as user */
accountRouter.post('/me/profile/ingredient', authentification.authenticateToken, validationBody.validateAccount_has_ingredientSchema('body'), account.addIngredientToAccount);
/** Delete ingredient to the account as user */
accountRouter.delete('/me/profile/ingredient/:id(\\d+)', authentification.authenticateToken, account.deleteIngredientToAccount);

module.exports = accountRouter;