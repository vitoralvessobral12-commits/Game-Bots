const { lerToken, contaAtiva } = require('./../token')

async function autenticarCliente(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const decoded = lerToken(req)

    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' })
    }

    // Um token de atendente é válido (mesma assinatura), mas NÃO pode ser usado como cliente
    if (decoded.tipo !== 'cliente') {
        return res.status(403).json({ error: 'Acesso negado' })
    }

    if (!(await contaAtiva(decoded))) {
        return res.status(401).json({ error: 'Conta desativada ou inexistente' })
    }

    req.clienteId = decoded.id
    next()
}

module.exports = {
    autenticarCliente
}
