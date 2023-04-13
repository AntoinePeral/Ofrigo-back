const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Step extends Model {}

Step.init({
  content: {
    type: DataTypes.STRING,
  },
  number: {
    type: DataTypes.INTEGER,
  }
}, 
{
  sequelize,
  tableName: "step"
});

module.exports = Step;