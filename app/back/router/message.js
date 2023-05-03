const { Router } = require("express");
const messageRouter = Router();
const { message, home } = require("../controller");
const validationBody = require("../../service/validation/validate");
const { isAdmin } = require("../../service/middleware");

//Admin
messageRouter.get("/admin/message", isAdmin, home.menu, message.getAllMessagePage);
messageRouter.get("/admin/message/:id(\\d+)", isAdmin, home.menu, message.getMessagePage);
messageRouter.get("/admin/message/create", isAdmin, home.menu, message.getCreateMessagePage);
messageRouter.post("/admin/message/create", isAdmin, home.menu, validationBody.validateAdminMessage('body'), message.addMessage);
messageRouter.get("/admin/message/update/:id(\\d+)", isAdmin, home.menu, message.getCreateMessagePage);
messageRouter.post("/admin/message/update/:id(\\d+)", isAdmin, home.menu, validationBody.validateAdminMessage('body'), message.updateMessage);
messageRouter.post("/admin/message/delete/:id(\\d+)", isAdmin, home.menu, message.deleteMessage);


module.exports = messageRouter;