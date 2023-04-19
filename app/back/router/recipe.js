const { Router } = require("express");
const recipeRouter = Router();
const { recipe } = require("../controller");

recipeRouter.get("/admin/recipe", recipe.getRecipePage);

module.exports = recipeRouter;