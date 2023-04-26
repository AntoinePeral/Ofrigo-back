const debug = require("debug")("tagController");
const APIError = require('../../service/error/APIError');
const { Tag } = require("../model");

const tagController = {

    /**
     * Get all tags and return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getAllTag (_, res, next){
        const tag = await Tag.findAll();

        if(tag){
            debug(tag);
            res.status(200).json(tag);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one tag by his id and return json Object.
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getTagById (req, res, next){
        const tagId = req.params.id;
        const tag = await Tag.findOne(tagId);

        if(tag){
            debug(tag);
            res.status(200).json(tag);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Add a tag and return an object
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async addTag (req, res, next) {
        const tagBody = req.body;
        const tag = new Tag(tagBody);

        if(tag){
            debug(tag);
            await tag.add();
            debug(tag);
            res.status(200).json(tag);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Update a tag and return an object
     * @param {*} req req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async updateTag (req, res, next) {
        const tagId = req.params.id;
        const tagBody = req.body;
        let tag = await Tag.findOne(tagId);

        if(tag){
            debug(tag);

            for (const value in tagBody) {
                tag[value] = tagBody[value];
            }

            await tag.update();
            const newTag = await Tag.findOne(tagId);
            debug(newTag);
            res.status(200).json(newTag);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Delete one tag by his id and return an string
     * @param {*} req req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async deleteTag (req, res, next) {
        const tagId = req.params.id;
        const response = await Tag.delete(tagId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },
    
};

module.exports= tagController;