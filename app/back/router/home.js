const { Router } = require("express");
const homeRouter = Router();
const { home } = require("../controller");
const { isAdmin } = require("../../service/middleware");

homeRouter.get("/admin/home", isAdmin, home.menu, home.getHomePage);

module.exports = homeRouter;