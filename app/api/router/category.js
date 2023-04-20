const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");

categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id(\\d+)", category.getCategoryById);
categoryRouter.post("/category", category.addCategory);
categoryRouter.put("/category/:id(\\d+)", category.updateCategory);
categoryRouter.delete("/category/:id(\\d+)", category.deleteCategory);

module.exports = categoryRouter;