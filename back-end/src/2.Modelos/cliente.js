const sequelize = require('./../1.Config/database')
const { DataTypes } = require('sequelize')

const Cliente = sequelize.define('Cliente', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    codigo_identificacao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

}, {
    tableName: 'clientes'
})

module.exports = Cliente