const { DataTypes } = require('sequelize');
const sequelize = require('../config/db_mysql');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('student', 'consultant', 'admin'),
        defaultValue: 'student'
    },
    profile_bio: {
        type: DataTypes.TEXT
    },
    profile_university: {
        type: DataTypes.STRING
    },
    profile_major: {
        type: DataTypes.STRING
    },
    profile_country: {
        type: DataTypes.STRING
    }
});

module.exports = User;
