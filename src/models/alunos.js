const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Aluno = sequelize.define('Aluno', {
    raAlun: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'raAlun'
    },
    nomeAlun: {
        type: DataTypes.STRING(80),
        allowNull: false,
        field: 'nomeAlun'
    }
}, {
    tableName: 'alunos',
    timestamps: false
});

module.exports = Aluno;