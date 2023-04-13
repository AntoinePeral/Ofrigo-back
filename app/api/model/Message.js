const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Message extends Model {}

Message.init({
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  }
}, 
{
  sequelize,
  tableName: "message"
});

module.exports = Message;