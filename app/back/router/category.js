const { Router } = require("express");
const categoryRouter = Router();
const { category, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");


//Admin
categoryRouter.get("/admin/category", home.leftMenu, category.getCategoriesPage);
categoryRouter.get("/admin/category/:id(\\d+)/delete", category.deleteCategory);

categoryRouter.get("/admin/category/create", home.leftMenu,category.getCategoryCreatePage);
categoryRouter.post("/admin/category/create", home.leftMenu,category.createCategory);

categoryRouter.get("/admin/category/:id(\\d+)", home.leftMenu, category.getOneCategoryPage);
categoryRouter.post("/admin/category/:id(\\d+)/edit", home.leftMenu, category.editCategory);


// categoryRouter.post("/admin/category", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.addCategory);
// categoryRouter.put("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateCategory('body'), category.updateCategory);
// categoryRouter.delete("/admin/category/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, category.deleteCategory);
// validationRole.isAdmin

module.exports = categoryRouter;