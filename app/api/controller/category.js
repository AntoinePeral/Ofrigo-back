const debug = require("debug")("categoryController");
const APIError = require('../../service/error/APIError');
const { Category } = require("../model");

const categoryController = {

    /**
     * Get all categories return json Objects in array
     * @param {*} _ 
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getAllCategory (_, res, next){
        const category = await Category.findAll();

        if(category){
            debug(category);
            res.status(200).json(category);
        }
        else{
            return next(new APIError("Aucune catégorie n'a été trouvée", 400));
        }
    },

    /**
     * Get one category by his id json return Object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async getCategoryById (req, res, next){
        const categoryId = req.params.id;
        const category = await Category.findOne(categoryId);

        if(category){
            debug(category);
            res.status(200).json(category);
        }
        else{
            return next(new APIError("Aucune catégorie n'a été trouvé", 400));
        }
    },

    /**
     * Add a category and return an object
     * @param {object} req  Express req -use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
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
            return next(new APIError("Erreur lors de la création d'une catégorie", 400));
        }
    },

    /**
     * Update a category and return an object
     * @param {object} req  Express req -req use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
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
            return next(new APIError("Erreur lors de la mise à jour de la catégorie", 400));
        }
    },

    /**
     * Delete one category by his id and return an string
     * @param {object} req  Express req -req use request to get the params.id
     * @param {object} res Express response
     * @param {function} next use it to return an error
     * @returns {APIError} return error
     */
    async deleteCategory (req, res, next) {
        const categoryId = req.params.id;
        const response = await Category.delete(categoryId);

        if(response){
            debug(response);
            res.status(200).json('Succes');
        }
        else{
            return next(new APIError("La catégorie n'a pas pu être supprimé", 400));
        }
    },
    
};

module.exports= categoryController;