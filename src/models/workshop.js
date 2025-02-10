const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Workshop = sequelize.define('Workshop', {
    idWork: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'idWork'
    },
    nomeWork: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'nomeWork'
    },
    dataWork: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'dataWork'
    },
    PROFESSOR_idProf: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'PROFESSOR_idProf'
    }
}, {
    tableName: 'workshop',
    timestamps: false
});

module.exports = Workshop;