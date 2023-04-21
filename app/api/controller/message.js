const debug = require("debug")("messageController");
const APIError = require('../../service/error/APIError');
const { Message } = require("../model");

const messageController = {

    /**
     * Get all messages return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllMessage (_, res, next){
        const message = await Message.findAll();

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
           next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one message by his id and return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getMessageById (req, res, next){
        const messageId = req.params.id;
        const message = await Message.findOne(messageId);

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            next(new APIError("Bad request", 400));
        }
    },

    async addMessage (req, res, next) {
        const messageBody = req.body;
        console.log(messageBody);
        const message = new Message(messageBody);
        debug(message)

        if(message){
            debug(message);
            await message.add();
            debug(message);
            res.status(200).json(message);
        }
        else{
            next(new APIError("Bad request", 400));
        }
    },

    async updateMessage (req, res, next) {
        const messageId = req.params.id;
        const messageBody = req.body;
        let message = await Message.findOne(messageId);

        if(message){
            debug(message);

            for (const key in messageBody) {
                message[key] = messageBody[key];
            }

            await message.update();
            const newMessage = await Message.findOne(messageId);
            debug(newMessage);
            res.status(200).json(newMessage);
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },

    async deleteMessage (req, res, next) {
        const messageId = req.params.id;
        const response = await Message.delete(messageId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            next(new APIError("Bad request", 500));
        }
    },
    
};

module.exports= messageController;