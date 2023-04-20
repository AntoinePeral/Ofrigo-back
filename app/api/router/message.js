const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");

messageRouter.get("/message", message.getAllMessage);
messageRouter.get("/message/:id(\\d+)", message.getMessageById);
messageRouter.post("/message", message.addMessage);
messageRouter.put("/message/:id(\\d+)", message.updateMessage);
messageRouter.delete("/message/:id(\\d+)", message.deleteMessage);

module.exports = messageRouter;