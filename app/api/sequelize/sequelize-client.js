const { Sequelize } = require("sequelize");

const PG_URL = process.env.DB_URL || "postgres://admin_ofrigo:ofrigo@localhost:5432/ofrigo";

const defineAttributes = {
    define: {
        updatedAt: "updated_at",
        createdAt: "created_at"
    }
};

const sequelize = new Sequelize(PG_URL, defineAttributes);

(async function(){
     try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}})();

module.exports = sequelize;
