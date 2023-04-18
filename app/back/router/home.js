const { Router } = require("express");
const homeRouter = Router();
const { home } = require("../controller");

homeRouter.get("/", home.getHome);

module.exports = homeRouter;