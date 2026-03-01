const { Sequelize } = require('sequelize');
require('dotenv').config();
require('sqlite3'); // Added for Vercel NFT tracing

const path = require('path');
const storagePath = process.env.NODE_ENV === 'production'
    ? '/tmp/database.sqlite'
    : './database.sqlite';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    logging: false
});

module.exports = sequelize;
