const debug = require("debug")("homeController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const homeController = {

    async getHomePage(_, res){
        const itemsMenu = [ Account.tableName, Message.tableName, Category.tableName, Ingredient.tableName, Recipe.tableName, Tag.tableName ];       

        res.render("home", {
            homeName: "Home",
            itemsMenu,
            currentItem: null
        });
    },

};

module.exports = homeController;