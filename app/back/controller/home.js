const debug = require("debug")("homeController");
const { Message, Ingredient, Recipe, Tag, Category } = require("../../api/model");

const homeController = {

    async getHomePage(_, res){
        const itemsMenu = [ Category.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName, Tag.tableName ];       

        res.render("home", {
            homeName: "Home",
            itemsMenu,
            currentItem: null
        });
    },

};

module.exports = homeController;