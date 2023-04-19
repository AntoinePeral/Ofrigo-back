const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");

messageRouter.get("/admin/message", message.getMessagePage);

module.exports = messageRouter;