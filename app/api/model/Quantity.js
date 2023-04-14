const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Quantity extends Model {}

Quantity.init({
  ingredient_quantity: {
    type: DataTypes.NUMBER,
  }
}, 
{
  sequelize,
  tableName: "recipe_has_ingredient_with_quantity"
});

module.exports = Quantity;