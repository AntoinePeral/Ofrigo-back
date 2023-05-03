const { Router } = require("express");
const messageRouter = Router();
const { message, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const authentification = require('../../service/middleware/authToken');
const { isAdmin } = require("../../service/middleware");

//Admin
messageRouter.get("/admin/message", isAdmin, home.menu, message.getAllMessagePage);
messageRouter.get("/admin/message/:id(\\d+)", isAdmin, home.menu, message.getMessagePage);
//messageRouter.post("/admin/contact", isAdmin, validationBody.validateMessageUser('body'), message.addMessageUser);
//messageRouter.put("/admin/message/:id(\\d+)", isAdmin, validationBody.validateMessageUser('body'), message.updateMessage);
messageRouter.post("/admin/message/delete/:id(\\d+)", isAdmin, home.menu, message.deleteMessage);

module.exports = messageRouter;