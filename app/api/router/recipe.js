const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");
//const validationModule = require("../../service/validation/validate");

recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id(\\d+)", recipe.getRecipeById);
recipeRouter.post("/recipe", recipe.addRecipe);
recipeRouter.put("/recipe/:id(\\d+)", recipe.updateRecipe);
recipeRouter.delete("/recipe/:id(\\d+)", recipe.deleteRecipe);
recipeRouter.post("/recipe/:id(\\d+)/ingredient", recipe.addIngredientToRecipe);
recipeRouter.put("/recipe/:id(\\d+)/ingredient", recipe.updateIngredientOfRecipe);
recipeRouter.delete("/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)", recipe.deleteIngredientOfRecipe);
//recipeRouter.post("/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", recipe.addStepToRecipe);
//recipeRouter.put("/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", recipe.updateStepOfRecipe);
//recipeRouter.delete("/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", recipe.deleteStepToRecipe);
//recipeRouter.post("/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)", recipe.addTagToRecipe);
//recipeRouter.delete("/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)", recipe.updateTagOfRecipe);

module.exports = recipeRouter;