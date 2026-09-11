const sequelize = require('./../1.Config/database')
const { DataTypes } = require('sequelize')

const Robo = sequelize.define('Robo',{

     id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})
module.exports = Robo