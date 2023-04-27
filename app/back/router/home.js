const { Router } = require("express");
const homeRouter = Router();
const { home } = require("../controller");
const validationBody = require("../../service/validation/validate");

homeRouter.get("/admin/home", home.getHomePage);

module.exports = homeRouter;