const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id(\\d+)", recipe.getRecipeById);

//Admin
recipeRouter.get("/admin/recipe", authentification.authenticateToken, validationRole.isAdmin, recipe.getAllRecipe);
recipeRouter.get("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.getRecipeById);
recipeRouter.post("/admin/recipe", authentification.authenticateToken, validationRole.isAdmin, recipe.addRecipe);
recipeRouter.put("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.updateRecipe);
recipeRouter.delete("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.deleteRecipe);

module.exports = recipeRouter;