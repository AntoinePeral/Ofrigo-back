const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");

recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id", recipe.getRecipeWithTags);

module.exports = recipeRouter;