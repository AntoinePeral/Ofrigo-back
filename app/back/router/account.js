const { Router } = require("express");
const accountRouter = Router();
const { account, admin } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
// accountRouter.get("/admin/profile", authentification.authenticateToken, admin.getAllAccount);
// accountRouter.get("/admin/profile/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, admin.getAccountById);
// accountRouter.delete("/admin/profile/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, admin.deleteAccount);
// accountRouter.post("/admin/register", validationBody.validateUserAccount('body'), account.addAdminAccount);

module.exports = accountRouter;