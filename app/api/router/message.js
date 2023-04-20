const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");
const validationModule = require("../../service/validation/validate");

messageRouter.get("/message", message.getAllMessage);
messageRouter.get("/message/:id(\\d+)", message.getMessageById);
messageRouter.post("/message", validationModule.validateMessage('body'), message.addMessage);
messageRouter.put("/message/:id(\\d+)", validationModule.validateMessage('body'), message.updateMessage);
messageRouter.delete("/message/:id(\\d+)", message.deleteMessage);

module.exports = messageRouter;