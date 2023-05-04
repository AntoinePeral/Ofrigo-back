const { Router } = require("express");
const ingredientRouter = Router();
const { ingredient, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
ingredientRouter.get("/admin/ingredient", isAdmin, home.menu, ingredient.getAllIngredientPage);
ingredientRouter.get("/admin/ingredient/:id(\\d+)", home.menu, ingredient.getIngredientPage);
ingredientRouter.get("/admin/ingredient/create", isAdmin, home.menu, ingredient.getCreateIngredientPage);
ingredientRouter.post("/admin/ingredient/create", isAdmin, home.menu, validationBody.validateAdminIngredient('body'), ingredient.addIngredient);
ingredientRouter.get("/admin/ingredient/update/:id(\\d+)", isAdmin, home.menu, ingredient.getCreateIngredientPage);
ingredientRouter.post("/admin/ingredient/update/:id(\\d+)", isAdmin, home.menu, validationBody.validateAdminIngredient('body'), ingredient.updateIngredient);
ingredientRouter.post("/admin/ingredient/delete/:id(\\d+)", isAdmin, home.menu, ingredient.deleteIngredient);

module.exports = ingredientRouter;