const rankingService = require('../3.Serviços/rankingServices')

async function listarRanking(req, res) {
    try {
        const resultado = await rankingService.listarRanking()

        return res.status(200).json({
            mensagem: 'Ranking encontrado',
            ranking: resultado.dados
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}

module.exports = {
    listarRanking
}