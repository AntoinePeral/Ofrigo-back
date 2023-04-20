const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");
const validationModule = require("../../service/validation/validate");

tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);
tagRouter.post("/tag", validationModule.validateTag('body'), tag.addTag);
tagRouter.put("/tag/:id(\\d+)", validationModule.validateTag('body'), tag.updateTag);
tagRouter.delete("/tag/:id(\\d+)", tag.deleteTag);

module.exports = tagRouter;