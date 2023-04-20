const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");
const validationModule = require("../../service/validation/validate");

categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id(\\d+)", category.getCategoryById);
categoryRouter.post("/category", validationModule.validateCategory('body'), category.addCategory);
categoryRouter.put("/category/:id(\\d+)", validationModule.validateCategory('body'), category.updateCategory);
categoryRouter.delete("/category/:id(\\d+)", category.deleteCategory);

module.exports = categoryRouter;