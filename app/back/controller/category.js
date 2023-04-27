const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const categoryController = {

    async getCategoryPage(_, res){
        const itemsMenu = [ Account.tableName ,Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];       

        res.render("category", {
            homeName: "Category",
            itemsMenu,
            currentItem: "category"
        });
    },

};

module.exports = categoryController;