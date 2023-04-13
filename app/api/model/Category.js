const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Category extends Model {}

Category.init({
  label: {
    type: DataTypes.STRING,
  }
}, 
{
  sequelize,
  tableName: "category"
});

module.exports = Category;