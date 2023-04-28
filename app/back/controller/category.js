const debug = require("debug")("tagController");
const { Message, Ingredient, Recipe, Tag, Category, Account } = require("../../api/model");
const baseUrl = `/admin/category`

const categoryController = {

    async getCategoriesPage(req, res){
        // const itemsMenu = [ Account.tableName ,Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];    
        const categoryList = await Category.findAll();   
    
        const user = req.session.user
        const token = req.session.token
    

        console.log(user);


        res.render("category/categories", {
            homeName: "Category",
            // itemsMenu,
            currentItem: "category",
            list: categoryList,
            user,
            token
        });
    },
    async getOneCategoryPage (req, res) {
        // const itemsMenu = [ Account.tableName ,Tag.tableName, Ingredient.tableName, Recipe.tableName, Message.tableName ];    
        const user = req.session.user
        const token = req.session.token
        const categoryId = req.params.id
        const category = await Category.findOne(categoryId); 
        const allIngredients = await Ingredient.findAll()
        res.locals.allIngredients= allIngredients;

        const actionLink = `${baseUrl}/${category.id}/edit`

    
        console.log(user);

        res.render("category/editCategory", {
            homeName: "Category",
            // itemsMenu,
            currentItem: "category",
            category,
            user,
            token,
            actionLink
        });
    },

    async deleteCategory (req, res) {
        const categoryId = req.params.id;
        try {
            await Category.delete(categoryId)
            res.redirect(baseUrl)
        } catch (error) {
            console.log('une erreur');
        }
    },

    getCategoryCreatePage (req, res) {
        const user = req.session.user
        try {
            res.render('category/create', {
                homeName: "Create Category",
                user
            })
        } catch (error) {
            console.log(error);

        }
    },

    async createCategory (req, res) {
        const categoryBody = req.body;
        const category = new Category(categoryBody);

        try {
            await category.add();
            res.redirect(baseUrl)
        } catch (error) {
            console.log(error);
        }
    },

    async editCategory (req, res) {
        const categoryId = req.params.id
        const category = await Category.findOne(categoryId); 
        const categoryBody = req.body;
        const updatedCategory = new Category(categoryBody);

        // console.log("log1",categoryId);
        // console.log("log2",category);
        // console.log("log3",categoryBody);
        // console.log("log4",updatedCategory);

        try {
            await updatedCategory.update();
            res.redirect(baseUrl)
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = categoryController;