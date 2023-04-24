const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);

//User
ingredientRouter.get("/me/profile/ingredient", authentification.authenticateToken, ingredient.getAllIngredientUser);
ingredientRouter.get("/me/profile/ingredient/:id(\\d+)", authentification.authenticateToken, ingredient.getOneIngredientUser);

//Admin
//ingredientRouter.get("/admin/ingredient", authentification.authenticateToken, validationRole.isAdmin, ingredient.getAllIngredient);
//ingredientRouter.get("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, ingredient.getIngredientById);
//ingredientRouter.post("/admin/ingredient", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateIngredient('body'), ingredient.addIngredient);
//ingredientRouter.put("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateIngredient('body'), ingredient.updateIngredient);
//ingredientRouter.delete("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, ingredient.deleteIngredient);

//Test
ingredientRouter.get("/admin/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/admin/ingredient/:id(\\d+)", ingredient.getIngredientById);
ingredientRouter.post("/admin/ingredient", validationBody.validateIngredient('body'), ingredient.addIngredient);
ingredientRouter.put("/admin/ingredient/:id(\\d+)", validationBody.validateIngredient('body'), ingredient.updateIngredient);
ingredientRouter.delete("/admin/ingredient/:id(\\d+)", ingredient.deleteIngredient);

module.exports = ingredientRouter;