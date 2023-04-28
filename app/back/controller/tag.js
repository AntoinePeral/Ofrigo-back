const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");

const tagController = {

    async getTagList(req, res){
        // const itemsMenu = [ Account.tableName, Category.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];       
        const user = req.session.user
        const allTags = await Tag.findAll()
        // res.send('hole')
        res.render('tag/tags',{
            homeName: "Tag",
            // itemsMenu,
            currentItem: "tag",
            user,
            list: allTags
        });
    },

    async editTag(req, res) {
        const tagId = req.params.id
        const tag= await Tag.findOne(tagId); 
        const tagBody = req.body;
        const updatedTag= new Tag(tagBody);

        // console.log("log1",categoryId);
        // console.log("log2",category);
        // console.log("log3",categoryBody);
        // console.log("log4",updatedCategory);

        try {
            await updatedTag.update();
            res.redirect(baseUrl)
        } catch (error) {
            console.log(error);
        }
    },


};

module.exports = tagController;