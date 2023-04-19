const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");

ingredientRouter.get("/admin/ingredient", ingredient.getIngredientPage);

module.exports = ingredientRouter;