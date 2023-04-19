const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");

categoryRouter.get("/admin/category", category.getCategoryPage);

module.exports = categoryRouter;