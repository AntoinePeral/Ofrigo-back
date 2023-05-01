const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
ingredientRouter.get("/admin/ingredient", /*authentification.authenticateToken, validationRole.isAdmin,*/ home.menu, ingredient.getAllIngredientPage);
ingredientRouter.get("/admin/ingredient/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/home.menu, ingredient.getIngredientPage);
//ingredientRouter.post("/admin/ingredient", /*authentification.authenticateToken, validationRole.isAdmin,*/ validationBody.validateIngredient('body'), ingredient.addIngredient);
//ingredientRouter.put("/admin/ingredient/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin,*/ validationBody.validateIngredient('body'), ingredient.updateIngredient);
ingredientRouter.post("/admin/ingredient/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin,*/ home.menu, ingredient.deleteIngredient);

module.exports = ingredientRouter;