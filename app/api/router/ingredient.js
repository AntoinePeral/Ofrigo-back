const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");
const validationModule = require("../../service/validation/validate");

ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);
ingredientRouter.post("/ingredient", validationModule.validateIngredient('body'), ingredient.addIngredient);
ingredientRouter.put("/ingredient/:id(\\d+)", validationModule.validateIngredient('body'), ingredient.updateIngredient);
ingredientRouter.delete("/ingredient/:id(\\d+)", ingredient.deleteIngredient);

module.exports = ingredientRouter;