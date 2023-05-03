const debug = require("debug")("homeController");
const { CoreModel } = require("../../api/model");

const homeController = {

    async getHomePage(req, res){     

        res.render("home", {
            homeName: "Home",
            css: '/css/home.css'
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