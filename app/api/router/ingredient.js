const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

ingredientRouter.get("/ingredient", ingredient.getAllIngredient);
ingredientRouter.get("/ingredient/:id(\\d+)", ingredient.getIngredientById);
ingredientRouter.get("/admin/ingredient", middleware.authenticateToken, ingredient.getAllIngredient);
ingredientRouter.get("/admin/ingredient/:id(\\d+)", middleware.authenticateToken, ingredient.getIngredientById);
ingredientRouter.post("/admin/ingredient", middleware.authenticateToken, validationModule.validateIngredient('body'), ingredient.addIngredient);
ingredientRouter.put("/admin/ingredient/:id(\\d+)", middleware.authenticateToken, validationModule.validateIngredient('body'), ingredient.updateIngredient);
ingredientRouter.delete("/admin/ingredient/:id(\\d+)", middleware.authenticateToken, ingredient.deleteIngredient);

module.exports = ingredientRouter;