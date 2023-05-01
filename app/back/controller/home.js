const debug = require("debug")("homeController");
const { CoreModel, Ingredient } = require("../../api/model");

const homeController = {

    async getHomePage(req, res){     
        const user = req.session.user
        const token = req.session.token

        res.render("home", {
            homeName: "Home",
            user,
            token,
            css: ''
        });
    },

    async menu (_, res, next){
        try{
            res.locals.menu = await CoreModel.findTableName();
            next();
        }catch(error){
            console.log(error);
        }
    },

};

module.exports = homeController;