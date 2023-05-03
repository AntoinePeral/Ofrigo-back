const { Router } = require("express");
const categoryRouter = Router();
const { category, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
categoryRouter.get("/admin/category", isAdmin, home.menu, category.getAllCategoryPage);
categoryRouter.get("/admin/category/:id(\\d+)", isAdmin, home.menu, category.getCategoryPage);
categoryRouter.get("/admin/category/create", isAdmin, home.menu, category.getCreateCategoryPage);
categoryRouter.post("/admin/category/create", isAdmin, home.menu, validationBody.validateAdminCategory('body'), category.addCategory);
categoryRouter.get("/admin/category/update/:id(\\d+)", isAdmin, home.menu, category.getCreateCategoryPage);
categoryRouter.post("/admin/category/update/:id(\\d+)", isAdmin, home.menu, validationBody.validateAdminCategory('body'), category.updateCategory);
categoryRouter.post("/admin/category/delete/:id(\\d+)", isAdmin, home.menu, category.deleteCategory);
categoryRouter.post("/admin/category/:categoryId(\\d+)/ingredient/:ingredientId(\\d+)", isAdmin, home.menu, category.removeIngredientFromCategory);

module.exports = categoryRouter;