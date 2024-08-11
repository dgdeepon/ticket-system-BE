const Sequelize = require("sequelize");
require("dotenv").config();

const databaseInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: "mysql",
  }
);

module.exports = databaseInstance;
