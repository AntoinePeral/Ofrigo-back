const { Router } = require("express");
const recipeRouter = Router();
const { recipe, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
recipeRouter.get("/admin/recipe", isAdmin, home.menu, recipe.getAllRecipePage);
recipeRouter.get("/admin/recipe/:id(\\d+)", isAdmin, home.menu, recipe.getRecipePage);
recipeRouter.get("/admin/recipe/create", isAdmin, home.menu, recipe.getCreateRecipePage);
recipeRouter.post("/admin/recipe/create", isAdmin, home.menu, /*validationBody.validateAdminrecipe('body'),*/ recipe.addRecipe);
recipeRouter.get("/admin/recipe/update/:id(\\d+)", isAdmin, home.menu, recipe.getCreateRecipePage);
recipeRouter.post("/admin/recipe/update/:id(\\d+)", isAdmin, home.menu, /*validationBody.validateAdminrecipe('body'),*/ recipe.updateRecipe);
recipeRouter.post("/admin/recipe/delete/:id(\\d+)", isAdmin, home.menu, recipe.deleteRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/ingredient/:ingredientId(\\d+)", isAdmin, home.menu, recipe.removeIngredientFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/tag/:tagId(\\d+)", isAdmin, home.menu, recipe.removeTagFromRecipe);
recipeRouter.post("/admin/recipe/:recipeId(\\d+)/step/:stepId(\\d+)", isAdmin, home.menu, recipe.removeStepFromRecipe);


//recipeRouter.post("/admin/recipe", authentification.authenticateToken, validationRole.isAdmin, recipe.addRecipe);
//recipeRouter.put("/admin/recipe/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, recipe.updateRecipe);
// recipeRouter.post("/admin/recipe/:id(\\d+)/add", isAdmin, home.menu, validationBody.validateAdminStep('body'), recipe.addStep);
// recipeRouter.post("/admin/recipe/:id(\\d+)/update", isAdmin, home.menu, validationBody.validateAdminStep('body'), recipe.updateStep);
// recipeRouter.post("/admin/recipe/:id(\\d+)/add", isAdmin, home.menu, validationBody. validateAdminRecipe_has_ingredient_with_quantity('body'), recipe.addIngredient);
// recipeRouter.post("/admin/recipe/:id(\\d+)/update", isAdmin, home.menu, validationBody. validateAdminRecipe_has_ingredient_with_quantity('body'), recipe.updateIngredient);
// recipeRouter.post("/admin/recipe/:id(\\d+)/add", isAdmin, home.menu, validationBody. validateAdminRecipe_has_tag('body'), recipe.addTag);
// recipeRouter.post("/admin/recipe/:id(\\d+)/update", isAdmin, home.menu, validationBody. validateAdminRecipe_has_tag('body'), recipe.updateTag);
// recipeRouter.post("/admin/recipe/:id(\\d+)/add", isAdmin, home.menu, validationBody. validateAdminRecipe('body'), recipe.addRecipe);
// recipeRouter.post("/admin/recipe/:id(\\d+)/update", isAdmin, home.menu, validationBody. validateAdminRecipe('body'), recipe.updateRecipe);

module.exports = recipeRouter;