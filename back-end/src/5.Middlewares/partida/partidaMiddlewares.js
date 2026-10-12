const { idValido } = require('./../validacoes')

function validarPartida(req, res, next) {
    const { cliente1_id, cliente2_id, robo_id, vencedor_id } = req.body || {}

    if (![cliente1_id, cliente2_id, robo_id, vencedor_id].every(idValido)) {
        return res.status(400).json({ error: 'Jogadores, robô e vencedor devem ser ids válidos' })
    }

    // Converte para número aqui: daqui pra frente o service só recebe inteiros
    req.body.cliente1_id = Number(cliente1_id)
    req.body.cliente2_id = Number(cliente2_id)
    req.body.robo_id = Number(robo_id)
    req.body.vencedor_id = Number(vencedor_id)

    next()
}

// ?pagina=1&limite=50 no histórico público (limite máximo 100)
function validarPaginacao(req, res, next) {
    const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina)
    const limite = req.query.limite === undefined ? 50 : Number(req.query.limite)

    if (!Number.isInteger(pagina) || pagina < 1 || !Number.isInteger(limite) || limite < 1 || limite > 100) {
        return res.status(400).json({ error: 'Paginação inválida (limite entre 1 e 100)' })
    }

    req.paginacao = { pagina, limite }
    next()
}

module.exports = {
    validarPartida,
    validarPaginacao
}
