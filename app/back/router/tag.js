const { Router } = require("express");
const tagRouter = Router();
const { tag, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
tagRouter.get("/admin/tag", isAdmin, home.menu, tag.getAllTagPage);
tagRouter.get("/admin/tag/:id(\\d+)", isAdmin, home.menu, tag.getTagPage);
tagRouter.get("/admin/tag/create", isAdmin, home.menu, tag.getCreateTagPage);
tagRouter.post("/admin/tag/create", isAdmin, home.menu, /*validationBody.validateAdminTag('body'),*/ tag.addTag);
tagRouter.get("/admin/tag/update/:id(\\d+)", isAdmin, home.menu, tag.getCreateTagPage);
tagRouter.post("/admin/tag/update/:id(\\d+)", isAdmin, home.menu, /*validationBody.validateAdminTag('body'),*/ tag.updateTag);
tagRouter.post("/admin/tag/delete/:id(\\d+)", isAdmin, home.menu, tag.deleteTag);
tagRouter.post("/admin/tag/:tagId(\\d+)/recipe/:recipeId(\\d+)", isAdmin, home.menu, tag.removeRecipeFromTag);

module.exports = tagRouter;