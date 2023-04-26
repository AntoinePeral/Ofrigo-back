const debug = require("debug")("messageController");
const APIError = require('../../service/error/APIError');
const { Message } = require("../model");

const messageController = {

    /**
     * Get all messages return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getAllMessage (_, res, next){
        const message = await Message.findAll();

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one message by his id and return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getMessageById (req, res, next){
        const messageId = req.params.id;
        const message = await Message.findOne(messageId);
        
        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 400));
        }
    },

    /**
     * Add a message and return an object
     * @param {*} req use request to get the body
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async addMessage (req, res, next) {
        const messageBody = req.body;
        const message = new Message(messageBody);
        debug(message)

        if(message){
            debug(message);
            await message.add();
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 400));
        }
    },

    /**
     * User can add a message and return an object
     * @param {*} req use request to get the body
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async addMessageUser (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 401));
        }

        let messageBody = req.body;
        messageBody.email = req.user.email;

        const message = new Message(messageBody);
        debug(message)

        if(message){
            debug(message);
            await message.add();
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 400));
        }
    },

    /**
     * Get all messages from a user and return json Object
     * @param {*} req use request to get user
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getUserMessage (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 401));
        }

        const message = await Message.findAllMessageUser(req.user.email);

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one messages from a user and return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getUserMessageById (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 401));
        }

        const messageId = req.params.id;
        const message = await Message.findOneMessageUser(req.user.email, messageId);

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Update a message and return an object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
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
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Delete one message by his id and return an string
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async deleteMessage (req, res, next) {
        const messageId = req.params.id;
        const response = await Message.delete(messageId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },
    
};

module.exports= messageController;