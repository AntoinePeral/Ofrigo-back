const debug = require("debug")("messageController");
const { Message } = require("../model");

const messageController = {

    async getAllMessage (_, res){
        try{
            const message = await Message.findAll();
            debug(message);

            res.status(200).json(message);
        }catch(error){
            console.log(error);
        }
    },

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