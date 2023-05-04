const debug = require("debug")("messageController");
const APIError = require('../../service/error/APIError');
const { Message } = require("../model");

const messageController = {

    /**
     * Get all messages return json Objects in array
     * @param {*} _ 
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getAllMessage (_, res, next){
        const message = await Message.findAll();

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Aucun Message n'a été trouvé", 400));
        }
    },

    /**
     * Get one message by his id and return json Object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getMessageById (req, res, next){
        const messageId = req.params.id;
        const message = await Message.findOne(messageId);
        
        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Aucune message n'a été trouvé", 400));
        }
    },

    /**
     * Add a message and return an object
     * @param {object} req  Express req -use request to get the body
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
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
            return next(new APIError("L'envoie du message a échoué", 400));
        }
    },

    /**
     * User can add a message and return an object
     * @param {object} req  Express req -use request to get the body
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async addMessageUser (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 403));
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
            return next(new APIError("L'envoie du message a échoué", 400));
        }
    },

    /**
     * Get all messages from a user and return json Object
     * @param {object} req  Express req -use request to get user
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getUserMessage (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 403));
        }

        const message = await Message.findAllMessageUser(req.user.email);

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Aucun message n'a été trouvé", 400));
        }
    },

    /**
     * Get one messages from a user and return json Object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getUserMessageById (req, res, next) {
        if(!req.user.id) {
            return next(new APIError('User not provided', 403));
        }

        const messageId = req.params.id;
        const message = await Message.findOneMessageUser(req.user.email, messageId);

        if(message){
            debug(message);
            res.status(200).json(message);
        }
        else{
            return next(new APIError("Aucun message n'a été trouvé", 400));
        }
    },

    /**
     * Update a message and return an object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
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
            return next(new APIError("Le message n'a pas pu être modifié", 400));
        }
    },

    /**
     * Delete one message by his id and return an string
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async deleteMessage (req, res, next) {
        const messageId = req.params.id;
        const response = await Message.delete(messageId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("La suppresionn du message a échoué", 400));
        }
    },
    
};

module.exports= messageController;