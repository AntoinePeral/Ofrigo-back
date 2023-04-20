const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");

recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id(\\d+)", recipe.getRecipeById);
recipeRouter.post("/recipe", recipe.addRecipe);
recipeRouter.put("/recipe/:id(\\d+)", recipe.updateRecipe);
recipeRouter.delete("/recipe/:id(\\d+)", recipe.deleteRecipe);

module.exports = recipeRouter;