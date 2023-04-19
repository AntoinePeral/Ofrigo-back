const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");

tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);

module.exports = tagRouter;