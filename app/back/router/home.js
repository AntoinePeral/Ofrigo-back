const { Router } = require("express");
const homeRouter = Router();
const { home } = require("../controller");

homeRouter.get("/", home.getHomePage);

module.exports = homeRouter;