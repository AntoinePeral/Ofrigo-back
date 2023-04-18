const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");

recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id", recipe.getRecipeById);

module.exports = recipeRouter;