const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category } = require("../../api/model");

const ingredientController = {

    async getIngredientPage(_, res){
        const itemsMenu = [ Tag.tableName, Category.tableName, Recipe.tableName, Message.tableName ];       

        res.render("ingredient", {
            homeName: "Ingredient",
            itemsMenu,
            currentItem: "ingredient"
        });
    },

};

module.exports = ingredientController;