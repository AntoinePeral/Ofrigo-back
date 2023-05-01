const { Router } = require("express");
const tagRouter = Router();
const { tag, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
tagRouter.get("/admin/tag", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, tag.getAllTagPage);
tagRouter.get("/admin/tag/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, tag.getTagPage);
//tagRouter.post("/admin/tag", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.addTag);
//tagRouter.put("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.updateTag);
tagRouter.post("/admin/tag/delete/:id(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, tag.deleteTag);
tagRouter.post("/admin/tag/:tagId(\\d+)/recipe/:recipeId(\\d+)", /*authentification.authenticateToken, validationRole.isAdmin*/isAdmin, home.menu, tag.removeRecipeFromTag);

module.exports = tagRouter;