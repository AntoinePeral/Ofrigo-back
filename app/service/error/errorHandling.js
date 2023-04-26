const APIError = require("./APIError");
const debug = require("debug")("error");
const path = require("path");
const fs = require('fs').promises;
const createWriteStream = require('fs').createWriteStream;

const errorModule = {
    /**
     * Method mananging errors
     * @param {*} err Errors
     * @param {object} req Express resquest
     * @param {object} res Express response. Send a response to the client
     * @param {function} next Run the next middleware
     */
    async manage(err, req, res, next) {
        console.log('Etape 4.5 JE suis dans le manage error');
        await errorModule.log(err, req.url);
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
            console.log('Je suis dans erreur perso MANAGE');
            return res.status(err.code).json({message: err.message})
        }

    },
    /**
     * Method to manage 404 error
     * @param {*} _ 
     * @param {*} __ 
     * @param {function} next Run the next middleware
     * @return {APIError} error
     */
    _404(_, __, next) {
        return next(new APIError('404 message', 404));
    },

    /**
     * Log all errors in a text file. If the text file doesn't exist, create it
     * @param {*} err The error 
     * @param {*} context the path where the error comes from
     */
    async log(err, context) {
        debug(err); // <= debug en DEV
        console.log(context);

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

/**
 * indicates whether a file exists or not
 * @param {*} path the path to the file
 * @returns True is exist /false if not
 */
async function fileExists (path) {  
    try {
      await fs.access(path)
      return true
    } catch {
      return false
    }
};
