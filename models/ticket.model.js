const { DataTypes, Model } = require("sequelize");
const databaseInstance = require("../config/db.config");
const { Users } = require("./users.model");

class Tickets extends Model {}
class Comments extends Model {}

Tickets.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignTo: {
      type: DataTypes.INTEGER,
    },
    assignedOrganization: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: databaseInstance,
    modelName: "tickets",
  }
);

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: databaseInstance,
    modelName: "ticket_comments",
  }
);

Comments.belongsTo(Tickets, { foreignKey: "ticketId", onDelete: "CASCADE" });
Tickets.hasMany(Comments, { foreignKey: "ticketId" });
Tickets.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Tickets, { foreignKey: "userId" });

module.exports = { Tickets, Comments };
