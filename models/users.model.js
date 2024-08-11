const { DataTypes, Model } = require("sequelize");
const databaseInstance = require("../config/db.config");

class Users extends Model {}
class Organizations extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: databaseInstance, modelName: "users" }
);


Organizations.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize: databaseInstance, modelName: "organizations" }
);

Organizations.belongsTo(Users);
Users.hasOne(Organizations);

module.exports = { Users, Organizations };
