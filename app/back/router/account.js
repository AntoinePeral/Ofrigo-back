const { Router } = require("express");
const accountRouter = Router();
const { account, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
accountRouter.get("/admin/account", isAdmin, home.menu, account.getAllAccountPage);
accountRouter.get("/admin/account/:id(\\d+)", isAdmin, home.menu, account.getAccountPage);
accountRouter.post("/admin/account/delete/:id(\\d+)", isAdmin, home.menu, account.deleteAccount);
accountRouter.get("/admin/register", home.menu, account.getAddAdminAccountPage);
accountRouter.post("/admin/register", home.menu, validationBody.validateAdminAccount('body'), account.addAdminAccount);
accountRouter.get("/admin/account/update/:id(\\d+)", home.menu, account.getAddAdminAccountPage);
accountRouter.post("/admin/account/update/:id(\\d+)", home.menu, validationBody.validateAdminAccount('body'), account.updateAccount);
accountRouter.post('/admin/account/:accountId(\\d+)/ingredient/:ingredientId(\\d+)', isAdmin, account.deleteIngredientToAccount);
accountRouter.post('/admin/account/:accountId(\\d+)/message/:messageId(\\d+)', isAdmin, account.deleteMessageToAccount);
accountRouter.get("/admin/:name", isAdmin, home.menu, account.getAdminPage);

module.exports = accountRouter;