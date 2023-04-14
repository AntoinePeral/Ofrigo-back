const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sequelize/sequelize-client");

class Account extends Model {}

Account.init({
  last_name: {
    type: DataTypes.STRING,
  },
  first_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
}, 
{
  sequelize,
  tableName: "account"
});

module.exports = Account;