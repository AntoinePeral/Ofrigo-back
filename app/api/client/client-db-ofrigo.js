const pg = require("pg");

const { Pool } = pg;

const ofrigo = new Pool();

/**
 * Log connection successful or not
 */
(function(){
    try {
   ofrigo.connect();
   console.log("Connection has been established successfully.");
} catch (error) {
   console.error("Unable to connect to the database:", error);
}})();

module.exports = ofrigo;