const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");
const validationModule = require("../../service/validation/validate");
const middleware = require('../../service/middleware/authToken');

messageRouter.get("/admin/message", middleware.authenticateToken, message.getAllMessage);
messageRouter.get("/admin/message/:id(\\d+)", middleware.authenticateToken, message.getMessageById);
messageRouter.post("/admin/contact", middleware.authenticateToken, validationModule.validateMessage('body'), message.addMessage);
messageRouter.put("/admin/message/:id(\\d+)", middleware.authenticateToken, validationModule.validateMessage('body'), message.updateMessage);
messageRouter.delete("/admin/message/:id(\\d+)", middleware.authenticateToken, message.deleteMessage);
messageRouter.get("/me/profile/message", middleware.authenticateToken, message.getUserMessage);
messageRouter.get("/me/profile/message/:id(\\d+)", middleware.authenticateToken, message.getUserMessageById);
messageRouter.post("/contact", validationModule.validateMessage('body'), message.addMessage);
messageRouter.put("/me/profile/message/:id(\\d+)", middleware.authenticateToken, validationModule.validateMessage('body'), message.updateMessage);
messageRouter.delete("/me/profile/message/:id(\\d+)", middleware.authenticateToken, message.deleteMessage);

module.exports = messageRouter;