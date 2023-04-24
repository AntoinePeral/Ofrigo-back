const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id(\\d+)", recipe.getRecipeById);
recipeRouter.get("/admin/recipe", middleware.authenticateToken, recipe.getAllRecipe);
recipeRouter.get("/admin/recipe/:id(\\d+)", middleware.authenticateToken, recipe.getRecipeById);
recipeRouter.post("/admin/recipe", middleware.authenticateToken, recipe.addRecipe);
recipeRouter.put("/admin/recipe/:id(\\d+)", middleware.authenticateToken, recipe.updateRecipe);
recipeRouter.delete("/admin/recipe/:id(\\d+)", middleware.authenticateToken, recipe.deleteRecipe);
//recipeRouter.post("/recipe/:id(\\d+)/ingredient", recipe.addIngredientToRecipe);
//recipeRouter.put("/recipe/:id(\\d+)/ingredient", recipe.updateIngredientOfRecipe);
//recipeRouter.delete("/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)", recipe.deleteIngredientOfRecipe);

module.exports = recipeRouter;