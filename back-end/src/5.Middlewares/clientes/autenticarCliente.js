const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})

function autenticarCliente(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não fornecido'
        })
    }

    const [esquema, token] = authHeader.split(' ')

    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({
            error: 'Token inválido'
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        // Um token de atendente é válido (mesma assinatura), mas NÃO pode ser usado como cliente
        if (decoded.tipo !== 'cliente') {
            return res.status(403).json({
                error: 'Acesso negado'
            })
        }

        req.clienteId = decoded.id

        next()

    } catch (error) {
        return res.status(401).json({
            error: 'Token inválido'
        })
    }
}

module.exports = {
    autenticarCliente
}