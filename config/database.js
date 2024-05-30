const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express_test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;