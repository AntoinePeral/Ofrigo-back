const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id(\\d+)", category.getCategoryById);
categoryRouter.get("/admin/category", middleware.authenticateToken, category.getAllCategory);
categoryRouter.get("/admin/category/:id(\\d+)", middleware.authenticateToken, category.getCategoryById);
categoryRouter.post("/admin/category", middleware.authenticateToken, validationModule.validateCategory('body'), category.addCategory);
categoryRouter.put("/admin/category/:id(\\d+)", middleware.authenticateToken, validationModule.validateCategory('body'), category.updateCategory);
categoryRouter.delete("/admin/category/:id(\\d+)", middleware.authenticateToken, category.deleteCategory);

module.exports = categoryRouter;