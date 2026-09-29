const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

function autenticarAtendente(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const [esquema, token] = authHeader.split(' ')

    if (esquema !== 'Bearer') {
        return res.status(401).json({ error: 'Token inválido' })
    }

    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ error: 'Token inválido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Um token de cliente é válido (mesma assinatura), mas NÃO pode entrar na área do atendente
        if (decoded.tipo !== 'atendente') {
            return res.status(403).json({ error: 'Acesso negado' })
        }

        req.atendente = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}

module.exports = {
    autenticarAtendente
}