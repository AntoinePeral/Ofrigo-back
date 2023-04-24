const { Router } = require("express");
const adminRouter = Router();
const { account } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require ('../../service/middleware/authToken');

// Admin
// adminRouter.get("admin/account", account.getAllAccount);
// adminRouter.get("admin/account/:id(\\d+)", account.getAccountById);
// adminRouter.post("admin/register", validationModule.validateUserAccount('body'), account.addAccount);
// adminRouter.put("admin/profile/:id(\\d+)", middleware.authenticateToken,validationModule.validateUserAccount('body'), account.updateAccount);
// adminRouter.delete("admin/profile/:id(\\d+)", middleware.authenticateToken, account.deleteAccount);


module.exports = adminRouter;