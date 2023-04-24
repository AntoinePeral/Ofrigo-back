const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id(\\d+)", category.getCategoryById);

//Admin
//categoryRouter.get("/admin/category", authentification.authenticateToken, validationRole.isAdmin, category.getAllCategory);
//categoryRouter.get("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, category.getCategoryById);
//categoryRouter.post("/admin/category", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.addCategory);
//categoryRouter.put("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.updateCategory);
//categoryRouter.delete("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, category.deleteCategory);

//Test
categoryRouter.get("/admin/category", category.getAllCategory);
categoryRouter.get("/admin/category/:id(\\d+)", category.getCategoryById);
categoryRouter.post("/admin/category", validationBody.validateCategory('body'), category.addCategory);
categoryRouter.put("/admin/category/:id(\\d+)", validationBody.validateCategory('body'), category.updateCategory);
categoryRouter.delete("/admin/category/:id(\\d+)", category.deleteCategory);

module.exports = categoryRouter;