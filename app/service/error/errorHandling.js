const APIError = require("./APIError");
const debug = require("debug")("error");

const errorModule = {
    /**
     * Méthode mananging client response
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async manage(err, req, res, next) {
        console.log(err);
        if (!err.message) {
            switch (err.code) {
                case 400:
                    res.status(400).json({message:"Bad request"});
                    break;
                case 401:
                    res.status(401).json({message:"Unauthorized"});
                    break;
                case 404:
                    res.status(404).json({message:"Not found"});
                    break;
                case 500:
                    res.status(500).json({message:'Internal server error'});
                    break;
                default:
                    res.status(err.code).json({message:"Internal server error"});
                    break;
            }
        } else {
            res.status(err.code).json({message: err.message})
        }

    },
    /**
     * Methode managing 404
     * @param {*} _ 
     * @param {*} __ 
     * @param {*} next middleware pour indiquer à Express qu'il y a une erreur
     */
    _404(_, __, next) {
        next(new APIError('page not found', 404));
    },
    
};

module.exports = errorModule;
