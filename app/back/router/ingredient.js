const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
ingredientRouter.get("/admin/ingredient", authentification.authenticateToken, validationRole.isAdmin, ingredient.getAllIngredient);
ingredientRouter.get("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, ingredient.getIngredientById);
ingredientRouter.post("/admin/ingredient", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateIngredient('body'), ingredient.addIngredient);
ingredientRouter.put("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateIngredient('body'), ingredient.updateIngredient);
ingredientRouter.delete("/admin/ingredient/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, ingredient.deleteIngredient);

module.exports = ingredientRouter;