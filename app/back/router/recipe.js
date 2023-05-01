const { Router } = require("express");
const recipeRouter = Router();
const { recipe, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
recipeRouter.get("/admin/recipe", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.getAllRecipePage);
recipeRouter.get("/admin/recipe/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.getRecipePage);
//recipeRouter.post("/admin/recipe", authentification.authenticateToken, validationRole.isAdmin, recipe.addRecipe);
//recipeRouter.put("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.updateRecipe);
recipeRouter.post("/admin/recipe/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.deleteRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.removeIngredientFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.removeTagFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, recipe.removeStepFromRecipe);

module.exports = recipeRouter;