const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const messageController = {

    async getMessagePage(_, res){
        const itemsMenu = [ Account.tableName, Tag.tableName, Ingredient.tableName, Recipe.tableName, Category.tableName ];       

        res.render("message", {
            homeName: "Message",
            itemsMenu,
            currentItem: "message"
        });
    },

};

module.exports = messageController;