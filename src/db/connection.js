const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('presencelistdb', 'asdf', 'asdf', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    }
});

module.exports = sequelize;
