const debug = require("debug")("messageController");
const { Message } = require("../model");

const messageController = {

    /**
     * Get all messages return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllMessage (_, res){
        try{
            const message = await Message.findAll();
            debug(message);

            res.status(200).json(message);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one message by his id and return json Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getMessageById (req, res){
        const messageId = req.params.id;

        try{
            const message = await Message.findOne(messageId);
            debug(message);

            res.status(200).json(message);
        }catch(error){
            console.log(error);
        }
    },
    
};

module.exports= messageController;