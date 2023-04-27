const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");


//Admin
// categoryRouter.get("/admin/category", validationRole.isAdmin, category.getCategoryPage);
// categoryRouter.get("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, category.getCategoryById);
// categoryRouter.post("/admin/category", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.addCategory);
// categoryRouter.put("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.updateCategory);
// categoryRouter.delete("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, category.deleteCategory);

module.exports = categoryRouter;