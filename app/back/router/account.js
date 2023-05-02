const { Router } = require("express");
const accountRouter = Router();
const { account, home } = require("../controller");
const adminAccount = require("../../api/controller/account");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
accountRouter.get("/admin/account", /*authentification.authenticateToken*/home.menu, account.getAllAccountPage);
accountRouter.get("/admin/account/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, account.getAccountPage);
accountRouter.post("/admin/account/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, account.deleteAccount);
accountRouter.post("/admin/register", /*validationBody.validateUserAccount('body')*/ adminAccount.addAdminAccount);
accountRouter.post('/admin/account/:accountId/ingredient/:ingredientId(\\d+)', /*authentification.authenticateToken*/ account.deleteIngredientToAccount);
accountRouter.post('/admin/account/:accountId/message/:messageId(\\d+)', /*authentification.authenticateToken*/ account.deleteMessageToAccount);

module.exports = accountRouter;