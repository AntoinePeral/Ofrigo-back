const debug = require("debug")("homeController");
const { CoreModel } = require("../../api/model");

const homeController = {

    /**
     * Render the dashboard page
     * @param {req} req Express request
     * @param {res} res  Express response 
     */
    async getHomePage(req, res){     

        res.render("home", {
            homeName: "Home",
            css: '/css/home.css'
        });
    },

    /**
     * Render the menu on all pages
     * @param {*} _ 
     * @param {res} res  Express response 
     * @param {function} next call the next middleware (404)
     */
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