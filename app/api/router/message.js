const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');

//Public
messageRouter.post("/contact", validationBody.validateMessage('body'), message.addMessage);

//User
messageRouter.get("/me/profile/message", authentification.authenticateToken, message.getUserMessage);
messageRouter.get("/me/profile/message/:id(\\d+)", authentification.authenticateToken, message.getUserMessageById);
messageRouter.post("/me/profile/contact",authentification.authenticateToken, validationBody.validateMessageUser('body'), message.addMessageUser);
messageRouter.put("/me/profile/message/:id(\\d+)", authentification.authenticateToken, validationBody.validateMessage('body'), message.updateMessage);
messageRouter.delete("/me/profile/message/:id(\\d+)", authentification.authenticateToken, message.deleteMessage);

module.exports = messageRouter;