const pg = require("pg");

const { Pool } = pg;

const ofrigo = new Pool();

(async function(){
    try {
   ofrigo.connect();
   console.log("Connection has been established successfully.");
} catch (error) {
   console.error("Unable to connect to the database:", error);
}})();

module.exports = ofrigo;