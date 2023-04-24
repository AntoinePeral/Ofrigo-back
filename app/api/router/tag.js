const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);

//Admin
tagRouter.get("/admin/tag", authentification.authenticateToken, validationRole.isAdmin, tag.getAllTag);
tagRouter.get("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, tag.getTagById);
tagRouter.post("/admin/tag", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.addTag);
tagRouter.put("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateTag('body'), tag.updateTag);
tagRouter.delete("/admin/tag/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, tag.deleteTag);

//Test
//tagRouter.get("/admin/tag", tag.getAllTag);
//tagRouter.get("/admin/tag/:id(\\d+)", tag.getTagById);
//tagRouter.post("/admin/tag", validationBody.validateTag('body'), tag.addTag);
//tagRouter.put("/admin/tag/:id(\\d+)", validationBody.validateTag('body'), tag.updateTag);
//tagRouter.delete("/admin/tag/:id(\\d+)", tag.deleteTag);

module.exports = tagRouter;