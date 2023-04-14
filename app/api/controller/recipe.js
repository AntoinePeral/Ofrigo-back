const { Recipe } = require("../model");

const recipeController = {

    getAllRecipe: async (_, res) =>{
        const recipe = await Recipe.findAll({ include: [ 'recipeTag', 'recipeIngredient', 'recipeQuantity', 'recipeStep' ], order: [ ['recipeTag', 'label', 'ASC'], ['recipeIngredient', 'label', 'ASC'], ['recipeStep', 'id', 'ASC'] ] });
    
        res.status(200).json(recipe);
    },

    getRecipeWithTags: async (req, res) =>{
        const recipeId = req.params.id;
        //const recipe = await Recipe.findByPk(recipeId, { include: [ 'recipeTag', 'recipeIngredient', 'recipeQuantity', 'recipeStep', ], order: [ ['recipeTag', 'label', 'ASC'], ['recipeIngredient', 'label', 'ASC'], ['recipeStep', 'id', 'ASC'] ] });
        const recipe = await Recipe.findByPk(recipeId, { include: [ 'recipeTag', 'recipeIngredient', 'recipeQuantity', 'recipeStep', ], order: [ ['recipeTag', 'label', 'ASC'], ['recipeStep', 'id', 'ASC'] ] });

        res.status(200).json(recipe);
    },

};

module.exports = recipeController;
