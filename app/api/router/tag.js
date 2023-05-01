const { Router } = require("express");
const tagRouter = Router();
const { tag } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Public
tagRouter.get("/tag", tag.getAllTag);
tagRouter.get("/tag/:id(\\d+)", tag.getTagById);

module.exports = tagRouter;