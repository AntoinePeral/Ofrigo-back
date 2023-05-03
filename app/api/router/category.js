const { Router } = require("express");
const categoryRouter = Router();
const { category } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');

//Public
categoryRouter.get("/category", category.getAllCategory);
categoryRouter.get("/category/:id(\\d+)", category.getCategoryById);

module.exports = categoryRouter;