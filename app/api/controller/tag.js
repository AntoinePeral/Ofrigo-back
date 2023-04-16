const debug = require("debug")("tagController");
const { Tag } = require("../model");

const tagController = {

    async getAllTag (_, res){
        try{
            const tag = await Tag.findAll();
            debug(tag);

            res.status(200).json(tag);
        }catch(error){
            console.log(error);
        }
    },

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