const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');

//Public
ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);

//User
ingredientRouter.get("/me/profile/ingredient", authentification.authenticateToken, ingredient.getAllIngredientUser);
ingredientRouter.get("/me/profile/ingredient/:id(\\d+)", authentification.authenticateToken, ingredient.getOneIngredientUser);

module.exports = ingredientRouter;