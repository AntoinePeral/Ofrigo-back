const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Message } = require("../../api/model");

const messageController = {

    /**
     * Render the list of all messages
     * @param {*} _ 
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
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
            next();
        }
    },

    /**
     * Render a detail message page
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
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
            next();
        }
    },

    /**
     * Delete a message as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     * @param {function} next 
     * @returns {APIError} error
     */
    async deleteMessage (req, res, next) {
        const messageId = req.params.id;
        const response = await Message.delete(messageId);

        if(response){
            res.redirect("/admin/message");
        }
        else{
            return next(new APIError("La suppression du message a échoué", 400));
        }
    },

    /**
     * Render the create/update page 
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async getCreateMessagePage (req, res) {
        const messageId = req.params.id;
        const message = await Message.findOne(messageId);

        if(message){
            res.render("message-cu", {
                homeName: "Message",
                css: "/css/message-cu.css",
                errorMessage: null,
                message
            });
        }
        else{
            res.render("message-cu", {
                homeName: "Message",
                css: "/css/message-cu.css",
                errorMessage: null,
                message: null
            });
        }
    },

    /**
     * Send a message as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async addMessage (req, res) {
        const messageBody = req.body;
        let message = new Message(messageBody);

        debug(message);
        message = await message.add();
        debug(message);
        
        res.redirect("/admin/message");
    },

    /**
     * Update a message as admin
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async updateMessage (req, res) {
        const messageBody = req.body;
        const messageId = req.params.id;

        let message = await Message.findOne(messageId);

        Object.entries(messageBody).forEach(([key, value]) => {
            message[key] = value;
        });

        await message.update();
        
        res.redirect("/admin/message");
    },

};

module.exports = messageController;