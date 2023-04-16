const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");

categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id", category.getCategoryById);

module.exports = categoryRouter;