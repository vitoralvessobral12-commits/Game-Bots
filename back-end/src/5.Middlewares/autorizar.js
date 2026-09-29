const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Aceita token de cliente OU de atendente e guarda quem é em req.usuario
function autenticarUsuario(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const [esquema, token] = authHeader.split(' ')

    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Token inválido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.tipo !== 'cliente' && decoded.tipo !== 'atendente') {
            return res.status(401).json({ error: 'Token inválido' })
        }

        req.usuario = { id: decoded.id, tipo: decoded.tipo }
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
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