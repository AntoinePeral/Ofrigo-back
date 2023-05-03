const debug = require("debug")("tagController");
const dayjs = require('dayjs');
const APIError = require('../../service/error/APIError');
const { Tag, Recipe } = require("../../api/model");

const tagController = {

    async getAllTagPage(_, res, next){
        const tags = await Tag.findAll(); 

        if(tags){
            for(const tag of tags){
                tag.created_at = dayjs(tag.created_at).format('DD-MM-YYYY HH:mm:ss');
                tag.updated_at = dayjs(tag.updated_at).format('DD-MM-YYYY HH:mm:ss');
            }
    
            res.render("tags", {
                homeName: "Tag",
                tags,
                css : "/css/tags.css",
            });
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getTagPage (req, res, next) {
        const tagId = req.params.id;
        const tag = await Tag.findOne(tagId);

        if(tag){
            tag.created_at = dayjs(tag.created_at).format('DD-MM-YYYY HH:mm:ss');
            tag.updated_at = dayjs(tag.updated_at).format('DD-MM-YYYY HH:mm:ss');

            if(tag.recipe){
                for(const recipe of tag.recipe){
                    recipe.created_at = dayjs(recipe.created_at).format('DD-MM-YYYY HH:mm:ss');
                    recipe.updated_at = dayjs(recipe.updated_at).format('DD-MM-YYYY HH:mm:ss');
                }
            }
    
            res.render("tag", {
                homeName: "Tag",
                tag,
                css: "/css/tag.css",
            });
        }
        else{
            next();
        }
    },

    async deleteTag (req, res, next) {
        const tagId = req.params.id;
        const response = await Tag.delete(tagId);

        if(response){
            res.redirect("/admin/tag");
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async removeRecipeFromTag (req, res, next) {
        const tagId = req.params.tagId;
        const recipeId = req.params.recipeId;
        const response = await Tag.deleteRecipeFromTag(tagId, recipeId);

        if(response){
            res.redirect(`/admin/tag/${tagId}`);
        }
        else{
            return next(new APIError("Not found", 404));
        }
    },

    async getCreateTagPage (req, res) {
        const tagId = req.params.id;
        const tag = await Tag.findOne(tagId);

        if(tag){
            res.render("tag-cu", {
                homeName: "Tag",
                css: "/css/tag-cu.css",
                errorMessage: null,
                tag
            });
        }
        else{
            res.render("tag-cu", {
                homeName: "Tag",
                css: "/css/tag-cu.css",
                errorMessage: null,
                tag: null
            });
        }
    },

    async addTag (req, res) {
        const tagBody = req.body;
        let tag = new Tag(tagBody);

        debug(tag);
        tag = await tag.add();
        debug(tag);
        
        res.redirect("/admin/tag");
    },

    async updateTag (req, res) {
        const tagBody = req.body;
        const tagId = req.params.id;

        let tag = await Tag.findOne(tagId);

        Object.entries(tagBody).forEach(([key, value]) => {
            tag[key] = value;
        });

        await tag.update();
        
        res.redirect("/admin/tag");
    },
};

module.exports = tagController;