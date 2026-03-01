const { Sequelize } = require('sequelize');
require('dotenv').config();

// Using sqlite for demo purposes to avoid mysql connection errors
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

module.exports = sequelize;
