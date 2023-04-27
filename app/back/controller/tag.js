const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const tagController = {

    async getTagPage(_, res){
        const itemsMenu = [ Account.tableName, Category.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];       

        res.render("tag", {
            homeName: "Tag",
            itemsMenu,
            currentItem: "tag"
        });
    },

};

module.exports = tagController;