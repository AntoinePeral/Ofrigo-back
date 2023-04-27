const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const categoryController = {

    async getCategoryPage(req, res){
        const itemsMenu = [ Account.tableName ,Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];       
        const user = req.session.user
        const token = req.session.token

        res.render("category", {
            homeName: "Category",
            itemsMenu,
            currentItem: "category",
            user,
            token
        });
    },

};

module.exports = categoryController;