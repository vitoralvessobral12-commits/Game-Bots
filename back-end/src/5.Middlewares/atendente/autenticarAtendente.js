const jwt = require('jsonwebtoken')
const path = require('path')

require('dotenv').config({ path:path.resolve(__dirname,'../../.env') });

function autenticarAtendente(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1]


    if(authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token inválido' })
    }


    if(!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ error: 'Token inválido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.atendente = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' })
    }
}

module.exports = {
    autenticarAtendente
}