const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");

tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);
tagRouter.post("/tag", tag.addTag);
tagRouter.put("/tag/:id(\\d+)", tag.updateTag);
tagRouter.delete("/tag/:id(\\d+)", tag.deleteTag);

module.exports = tagRouter;