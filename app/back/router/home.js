const { Router } = require("express");
const homeRouter = Router();
const { home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const validationRole = require("../../service/middleware/adminValidator");

homeRouter.get("/admin/home", /* validationRole.isAdmin, */ home.menu, home.getHomePage);

module.exports = homeRouter;