const { Router } = require("express");
const accountRouter = Router();
const { account, admin } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
accountRouter.post("/register", validationBody.validateUserAccount('body'), account.addAccount);

//User
accountRouter.get("/me/profile", authentification.authenticateToken, account.getUserAccount);
accountRouter.put("/me/profile", authentification.authenticateToken, validationBody.validateUserAccount('body'), account.updateAccount);
accountRouter.delete("/me/profile", authentification.authenticateToken, account.deleteAccount);
accountRouter.post('/me/profile/ingredient', authentification.authenticateToken, validationBody.validateAccount_has_ingredientSchema('body'), account.addIngredientToAccount);
accountRouter.delete('/me/profile/ingredient/:id(\\d+)', authentification.authenticateToken, account.deleteIngredientToAccount);

//Admin
accountRouter.get("/admin/profile", authentification.authenticateToken, validationRole.isAdmin, admin.getAllAccount);
accountRouter.get("/admin/profile/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, admin.getAccountById);
accountRouter.delete("/admin/profile/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, admin.deleteAccount);
accountRouter.post("/admin/register", validationBody.validateUserAccount('body'), account.addAdminAccount);

//Test
//accountRouter.get("/admin/profile", admin.getAllAccount);
//accountRouter.get("/admin/profile/:id(\\d+)", admin.getAccountById);
//accountRouter.delete("/admin/profile/:id(\\d+)", admin.deleteAccount);

module.exports = accountRouter;