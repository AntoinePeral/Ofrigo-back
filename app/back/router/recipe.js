const { Router } = require("express");
const recipeRouter = Router();
const { recipe, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
recipeRouter.get("/admin/recipe", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, recipe.getAllRecipePage);
recipeRouter.get("/admin/recipe/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, recipe.getRecipePage);
//recipeRouter.post("/admin/recipe", authentification.authenticateToken, validationRole.isAdmin, recipe.addRecipe);
//recipeRouter.put("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.updateRecipe);
recipeRouter.post("/admin/recipe/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, recipe.deleteRecipe);

module.exports = recipeRouter;