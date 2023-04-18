const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");

messageRouter.get("/message", message.getAllMessage);
messageRouter.get("/message/:id", message.getMessageById);

module.exports = messageRouter;