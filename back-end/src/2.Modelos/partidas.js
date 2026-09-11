const sequelize = require('./../1.Config/database')
const { DataTypes } = require('sequelize')

const Cliente = require('./cliente')
const Robo = require('./robos')
const Atendente = require('./atendente')

const Partida = sequelize.define('Partida', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    cliente1_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },

    cliente2_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },

    vencedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },

    robo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'robos',
            key: 'id'
        }   
    },

    atendente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'atendentes',
            key: 'id'
        }
    },

    criado_em: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }

})
Partida.belongsTo(Cliente, {
    foreignKey: 'cliente1_id',
    as: 'jogador1'
})

Partida.belongsTo(Cliente, {
    foreignKey: 'cliente2_id',
    as: 'jogador2'
})
Partida.belongsTo(Cliente, {
    foreignKey: 'vencedor_id',
    as: 'vencedor'
})
Partida.belongsTo(Robo, {
    foreignKey: 'robo_id',
    as: "robo"
})
Partida.belongsTo(Atendente, {
    foreignKey: 'atendente_id',
    as: 'atendente'
})
module.exports = Partida