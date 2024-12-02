const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('presencelistdb', 'root', 'Kolke123!?', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    }
});

module.exports = sequelize;
