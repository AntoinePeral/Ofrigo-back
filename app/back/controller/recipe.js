const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category } = require("../../api/model");

const recipeController = {

    async getRecipePage(_, res){
        const itemsMenu = [ Category.tableName, Ingredient.tableName, Tag.tableName, Message.tableName ];       

        res.render("recipe", {
            homeName: "Tag",
            itemsMenu,
            currentItem: "recipe"
        });
    },

};

module.exports = recipeController;