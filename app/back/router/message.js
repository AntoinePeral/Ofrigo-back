const { Router } = require("express");
const messageRouter = Router();
const { message } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const validationRole = require("../../service/middleware/adminValidator");

//Admin
messageRouter.get("/admin/message", authentification.authenticateToken, validationRole.isAdmin, message.getAllMessage);
messageRouter.get("/admin/message/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, message.getMessageById);
messageRouter.post("/admin/contact", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateMessageUser('body'), message.addMessageUser);
messageRouter.put("/admin/message/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, validationBody.validateMessageUser('body'), message.updateMessage);
messageRouter.delete("/admin/message/:id(\\d+)", authentification.authenticateToken, validationRole.isAdmin, message.deleteMessage);

module.exports = messageRouter;