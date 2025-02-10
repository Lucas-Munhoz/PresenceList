const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ListaPresenca = sequelize.define('ListaPresenca', {
    ALUNOS_raAlun: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'ALUNOS_raAlun'
    },
    WORKSHOP_idWork: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'WORKSHOP_idWork'
    },
    WORKSHOP_PROFESSOR_idProf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'WORKSHOP_PROFESSOR_idProf'
    }
}, {
    tableName: 'lista_presenca',
    timestamps: false
});

module.exports = ListaPresenca;