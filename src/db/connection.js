require('dotenv').config();
const { Sequelize } = require('sequelize');

const isTestEnv = process.env.NODE_ENV === 'test';


const dbNome = isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const dbUsu = isTestEnv ? process.env.TEST_DB_USER : process.env.DB_USER;
const dbSenha = isTestEnv ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD;


const sequelize = new Sequelize(dbNome, dbUsu, dbSenha, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4',
    }
});

console.log(`Conectando ao banco: ${dbNome}`);

module.exports = sequelize;
