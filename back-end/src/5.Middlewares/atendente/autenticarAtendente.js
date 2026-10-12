const { lerToken, contaAtiva } = require('./../token')

async function autenticarAtendente(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const decoded = lerToken(req)

    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' })
    }

    // Um token de cliente é válido (mesma assinatura), mas NÃO pode entrar na área do atendente
    if (decoded.tipo !== 'atendente') {
        return res.status(403).json({ error: 'Acesso negado' })
    }

    if (!(await contaAtiva(decoded))) {
        return res.status(401).json({ error: 'Conta desativada ou inexistente' })
    }

    req.atendente = { id: decoded.id, email: decoded.email, tipo: decoded.tipo }
    next()
}

module.exports = {
    autenticarAtendente
}
