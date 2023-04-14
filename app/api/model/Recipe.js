const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Recipe extends Model {}

Recipe.init({
  label: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING
  },
  rate: {
    type: DataTypes.NUMBER
  },
  difficulty: {
    type: DataTypes.STRING
  },
  time: {
    type: DataTypes.INTEGER
  }
}, 
{
  sequelize,
  tableName: "recipe"
});

module.exports = Recipe;