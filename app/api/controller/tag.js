const debug = require("debug")("tagController");
const { Tag } = require("../model");

const tagController = {

    /**
     * Get all tags and return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     */
    async getAllTag (_, res){
        try{
            const tag = await Tag.findAll();
            debug(tag);

            res.status(200).json(tag);
        }catch(error){
            console.log(error);
        }
    },

    /**
     * Get one tag by his id and return json Object.
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     */
    async getTagById (req, res){
        const tagId = req.params.id;

        try{
            const tag = await Tag.findOne(tagId);
            debug(tag);

            res.status(200).json(tag);
        }catch(error){
            console.log(error);
        }
    },
    
};

module.exports= tagController;