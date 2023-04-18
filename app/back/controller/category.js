const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category } = require("../../api/model");

const categoryController = {

    async getCategoryPage(_, res){
        const itemsMenu = [ Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];       

        res.render("category", {
            homeName: "Category",
            itemsMenu,
            currentItem: "category"
        });
    },

};

module.exports = categoryController;