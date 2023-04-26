const APIError = require("./APIError");
const debug = require("debug")("error");
const path = require("path");
const fs = require('fs').promises;
//const createWriteStream = require('fs').createWriteStream;

const errorModule = {
    /**
     * Méthode mananging client response
     * @param {*} err 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async manage(err, req, res, next) {
        //await errorModule.log(err, req.url);
        
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
            console.log("Je suis ici");
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
        next(new APIError('404 message', 404));
    },

    async log(err, context) {
        debug(err); // <= debug en DEV

        // je vais générer des fichiers textes qui vont enregistrer les erreurs // <= log pour la production
        const fileName = new Date().toISOString().slice(0, 10) + ".log";
        const filePath = path.resolve(__dirname, "../log") + "/" + fileName;
        const fileBody = `${new Date().toISOString()};${context};${err.message}\n`;

        const isFileExist = await fileExists(filePath);

        try {
           // si le fichier n'existe pas
           if (!isFileExist) {
                await fs.appendFile(filePath,"date;contexte;message\n");
            }

            let file = await fs.open(filePath,"a");
            await file.appendFile(fileBody);
            file.close();
        }
        catch (error) {
            console.log(error);
        }
    
    }
};

module.exports = errorModule;

async function fileExists (path) {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
};
