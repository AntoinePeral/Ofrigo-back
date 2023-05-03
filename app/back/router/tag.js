const { Router } = require("express");
const tagRouter = Router();
const { tag, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
tagRouter.get("/admin/tag",isAdmin, home.menu, tag.getAllTagPage);
tagRouter.get("/admin/tag/:id(\\d+)",isAdmin, home.menu, tag.getTagPage);
//tagRouter.post("/admin/tag", isAdmin, validationBody.validateTag('body'), tag.addTag);
//tagRouter.put("/admin/tag/:id(\\d+)", isAdmin, validationBody.validateTag('body'), tag.updateTag);
tagRouter.post("/admin/tag/delete/:id(\\d+)",isAdmin, home.menu, tag.deleteTag);
tagRouter.post("/admin/tag/:tagId(\\d+)/recipe/:recipeId(\\d+)",isAdmin, home.menu, tag.removeRecipeFromTag);

module.exports = tagRouter;