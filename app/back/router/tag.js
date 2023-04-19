const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");

tagRouter.get("/admin/tag", tag.getTagPage);

module.exports = tagRouter;