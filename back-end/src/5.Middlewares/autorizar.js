const { lerToken, contaAtiva } = require('./token')

// Aceita token de cliente OU de atendente e guarda quem é em req.usuario
async function autenticarUsuario(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const decoded = lerToken(req)

    if (!decoded || (decoded.tipo !== 'cliente' && decoded.tipo !== 'atendente')) {
        return res.status(401).json({ error: 'Token inválido' })
    }

    if (!(await contaAtiva(decoded))) {
        return res.status(401).json({ error: 'Conta desativada ou inexistente' })
    }

    req.usuario = { id: decoded.id, tipo: decoded.tipo }
    next()
}

// Use depois de autenticarUsuario.
// Atendente passa; cliente só passa se o :id da URL for o dele mesmo.
function proprioClienteOuAtendente(req, res, next) {
    const { id, tipo } = req.usuario

    if (tipo === 'atendente') {
        return next()
    }

    if (tipo === 'cliente' && Number(req.params.id) === Number(id)) {
        return next()
    }

    return res.status(403).json({ error: 'Acesso negado' })
}

// Use depois de autenticarUsuario.
// Só o próprio cliente (o :id da URL precisa ser o dele).
function apenasProprioCliente(req, res, next) {
    const { id, tipo } = req.usuario

    if (tipo === 'cliente' && Number(req.params.id) === Number(id)) {
        return next()
    }

    return res.status(403).json({ error: 'Acesso negado' })
}

// Use depois de autenticarAtendente.
// O atendente só altera os próprios dados.
function apenasProprioAtendente(req, res, next) {
    if (Number(req.params.id) === Number(req.atendente.id)) {
        return next()
    }

    return res.status(403).json({ error: 'Acesso negado' })
}

module.exports = {
    autenticarUsuario,
    proprioClienteOuAtendente,
    apenasProprioCliente,
    apenasProprioAtendente
}