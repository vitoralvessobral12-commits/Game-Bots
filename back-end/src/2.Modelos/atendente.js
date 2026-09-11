const sequelize = require('./../1.Config/database')
const { DataTypes } = require('sequelize')

const Atendente = sequelize.define('Atendente', {

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
    ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
}
})

module.exports = Atendente