const { Router } = require("express");
const categoryRouter = Router();
const { category, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
categoryRouter.get("/admin/category", /*validationRole.isAdmin*/isAdmin, home.menu, category.getAllCategoryPage);
categoryRouter.get("/admin/category/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, category.getCategoryPage);
// categoryRouter.post("/admin/category", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.addCategory);
// categoryRouter.put("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.updateCategory);
categoryRouter.post("/admin/category/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, category.deleteCategory);
categoryRouter.post("/admin/category/:categoryId(\\d+)/ingredient/:ingredientId(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, category.removeIngredientFromCategory);

module.exports = categoryRouter;