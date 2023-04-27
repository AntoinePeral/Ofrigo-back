const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const accountController = {

    async getCategoryPage(_, res){
        const itemsMenu = [ Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName, Category.tableName ];       

        res.render("account", {
            homeName: "Account",
            itemsMenu,
            currentItem: "account"
        });
    },

};

module.exports = accountController;