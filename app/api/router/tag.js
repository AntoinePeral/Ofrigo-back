const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);
tagRouter.get("/admin/tag", middleware.authenticateToken, tag.getAllTag);
tagRouter.get("/admin/tag/:id(\\d+)", middleware.authenticateToken, tag.getTagById);
tagRouter.post("/admin/tag", middleware.authenticateToken, validationModule.validateTag('body'), tag.addTag);
tagRouter.put("/admin/tag/:id(\\d+)", middleware.authenticateToken, validationModule.validateTag('body'), tag.updateTag);
tagRouter.delete("/admin/tag/:id(\\d+)", middleware.authenticateToken, tag.deleteTag);

module.exports = tagRouter;