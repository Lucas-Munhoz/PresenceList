const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const Professor = sequelize.define('Professor', {
    idProf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeProf: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nomeProf'
    },
    emailProf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'emailProf'
    },
    senhaProf: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'senhaProf'
    }
}, {
    tableName: 'professor', 
    timestamps: false
});

module.exports = Professor;
