const Partida = require('./../2.Modelos/partidas')
const Cliente = require('./../2.Modelos/cliente')
const { fn, col, literal } = require('sequelize')

async function listarRanking() {
    try {
        const ranking = await Partida.findAll({
            attributes: [
                'vencedor_id',
                [fn('COUNT', col('vencedor_id')), 'vitorias']
            ],
            include: [
                {
                    model: Cliente,
                    as: 'vencedor',
                    attributes: ['id', 'nome']
                }
            ],
            group: ['vencedor_id', 'vencedor.id', 'vencedor.nome'],
            order: [[literal('vitorias'), 'DESC']]
        })

        const dados = ranking.map((item) => ({
            cliente_id: item.vencedor_id,
            nome: item.vencedor.nome,
            vitorias: Number(item.get('vitorias'))
        }))

        return {
            status: 200,
            dados
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    listarRanking
}