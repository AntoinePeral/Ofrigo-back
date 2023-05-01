const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Message } = require("../../api/model");

const messageController = {

    async getAllMessagePage(_, res, next){
        const messages = await Message.findAll();

        if(messages){
            for(const message of messages){
                message.created_at = dayjs(message.created_at).format('DD-MM-YYYY HH:mm:ss');
                message.updated_at = dayjs(message.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("messages", {
                homeName: "Message",
                messages,
                css: "/css/messages.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getMessagePage(req, res, next){
        const messageId = req.params.id;
        const message = await Message.findOne(messageId);

        if(message){
            message.created_at = dayjs(message.created_at).format('DD-MM-YYYY HH:mm:ss');
            message.updated_at = dayjs(message.updated_at).format('DD-MM-YYYY HH:mm:ss');
    
            res.render("message", {
                homeName: "Message",
                message,
                css: "/css/message.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async deleteMessage (req, res) {
        const messageId = req.params.id;
        await Message.delete(messageId);

        res.redirect("/admin/message");
    },

};

module.exports = messageController;