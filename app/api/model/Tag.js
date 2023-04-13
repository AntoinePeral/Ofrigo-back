const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Tag extends Model {}

Tag.init({
  label: {
    type: DataTypes.STRING,
  }
}, 
{
  sequelize,
  tableName: "tag"
});

module.exports = Tag;