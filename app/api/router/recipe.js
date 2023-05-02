const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
recipeRouter.get("/recipe", recipe.getAllRecipe);
recipeRouter.get("/recipe/:id(\\d+)", recipe.getRecipeById);

module.exports = recipeRouter;