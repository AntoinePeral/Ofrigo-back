const debug = require("debug")("homeController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const homeController = {

    async getHomePage(req, res){
        const itemsMenu = [ Account.tableName, Message.tableName, Category.tableName, Ingredient.tableName, Recipe.tableName, Tag.tableName ];       
        const user = req.session.user
        const token = req.session.token

        res.render("home", {
            homeName: "Home",
            itemsMenu,
            currentItem: null,
            user,
            token
        });
    },

};

module.exports = homeController;