const Sequelize = require('sequelize');
require('dotenv').config();


const databaseInstance = new Sequelize('all_sports', 'root','1234',{
    host:'localhost',
    dialect:"mysql"
});



module.exports = databaseInstance;