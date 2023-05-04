const { Router } = require("express");
const recipeRouter = Router();
const { recipe, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
recipeRouter.get("/admin/recipe", isAdmin, home.menu, recipe.getAllRecipePage);
recipeRouter.get("/admin/recipe/:id(\\d+)", isAdmin, home.menu, recipe.getRecipePage);
recipeRouter.get("/admin/recipe/create", isAdmin, home.menu, recipe.getCreateRecipePage);
recipeRouter.post("/admin/recipe/create", isAdmin, home.menu, validationBody.validateAdminRecipe('body'), recipe.addRecipe);
recipeRouter.get("/admin/recipe/update/:id(\\d+)", isAdmin, home.menu, recipe.getCreateRecipePage);
recipeRouter.post("/admin/recipe/update/:id(\\d+)", isAdmin, home.menu, validationBody.validateAdminRecipe('body'), recipe.updateRecipe);
recipeRouter.post("/admin/recipe/delete/:id(\\d+)", isAdmin, home.menu, recipe.deleteRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)", isAdmin, home.menu, recipe.removeIngredientFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)", isAdmin, home.menu, recipe.removeTagFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", isAdmin, home.menu, recipe.removeStepFromRecipe);

module.exports = recipeRouter;