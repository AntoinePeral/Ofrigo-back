const debug = require("debug")("homeController");
const { CoreModel } = require("../../api/model");

const homeController = {

    async getHomePage(_, res){
        res.render("home", {
            homeName: "Home",
        });
    },

    async leftMenu (_, res, next){
        try{
            res.locals.leftMenu = await CoreModel.findTableName();
            next();
        }catch(error){
            console.log(error);
        }
    },

};

module.exports = homeController;