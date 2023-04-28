const debug = require("debug")("homeController");
const { CoreModel } = require("../../api/model");

const homeController = {

    async getHomePage(req, res){     
        const user = req.session.user
        const token = req.session.token

        res.render("home", {
            homeName: "Home",
            currentItem: null,
            user,
            token
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