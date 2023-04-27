const debug = require("debug")("categoryController");
const APIError = require('../../service/error/APIError');
const { Category } = require("../model");

const categoryController = {

    /**
     * Get all categories return json Objects in array
     * @param {*} _ 
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getAllCategory (_, res, next){
        const category = await Category.findAll();

        if(category){
            debug(category);
            res.status(200).json(category);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Get one category by his id json return Object
     * @param {*} req use request to get the params.id
     * @param {*} res use to response to the client
     * @param {*} next use it to return an error
     */
    async getCategoryById (req, res, next){
        const categoryId = req.params.id;
        const category = await Category.findOne(categoryId);

        if(category){
            debug(category);
            res.status(200).json(category);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Add a category and return an object
     * @param {*} req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async addCategory (req, res, next) {
        const categoryBody = req.body;
        const category = new Category(categoryBody);

        if(category){
            debug(category);
            await category.add();
            debug(category);
            res.status(200).json(category);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Update a category and return an object
     * @param {*} req req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async updateCategory (req, res, next) {
        const categoryId = req.params.id;
        const categoryBody = req.body;
        let category = await Category.findOne(categoryId);

        if(category){
            debug(category);

            for (const key in categoryBody) {
                category[key] = categoryBody[key];
            }

            await category.update();
            const newCategory = await Category.findOne(categoryId);
            debug(newCategory);
            res.status(200).json(newCategory);
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },

    /**
     * Delete one category by his id and return an string
     * @param {*} req req use request to get the params.id
     * @param {*} res use it to response to the client
     * @param {*} next use it to return an error
     */
    async deleteCategory (req, res, next) {
        const categoryId = req.params.id;
        const response = await Category.delete(categoryId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("Bad request", 500));
        }
    },
    
};

module.exports= categoryController;