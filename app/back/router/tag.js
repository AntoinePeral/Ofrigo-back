const { Router } = require("express");
const tagRouter = Router();
const { tag, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
tagRouter.get("/admin/tag", home.leftMenu, tag.getTagList);
tagRouter.post("/admin/tag/:id(\\d+)/edit", home.leftMenu, tag.editTag)
// tagRouter.get("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, tag.getTagById);
// tagRouter.post("/admin/tag", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.addTag);
// tagRouter.put("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.updateTag);
// tagRouter.delete("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, tag.deleteTag);

module.exports = tagRouter;