const { Router } = require("express");
const recipeRouter = Router();
const { recipe, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
recipeRouter.get("/admin/recipe",isAdmin, home.menu, recipe.getAllRecipePage);
recipeRouter.get("/admin/recipe/:id(\\d+)",isAdmin, home.menu, recipe.getRecipePage);
//recipeRouter.post("/admin/recipe", isAdmin, recipe.addRecipe);
//recipeRouter.put("/admin/recipe/:id(\\d+)", isAdmin, recipe.updateRecipe);
recipeRouter.post("/admin/recipe/delete/:id(\\d+)",isAdmin, home.menu, recipe.deleteRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)",isAdmin, home.menu, recipe.removeIngredientFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)",isAdmin, home.menu, recipe.removeTagFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/step/:stepId(\\d+)",isAdmin, home.menu, recipe.removeStepFromRecipe);

module.exports = recipeRouter;