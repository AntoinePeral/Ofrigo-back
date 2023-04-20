const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");

ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);
ingredientRouter.post("/ingredient", ingredient.addIngredient);
ingredientRouter.put("/ingredient/:id(\\d+)", ingredient.updateIngredient);
ingredientRouter.delete("/ingredient/:id(\\d+)", ingredient.deleteIngredient);

module.exports = ingredientRouter;