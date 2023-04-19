const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");

ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);

module.exports = ingredientRouter;