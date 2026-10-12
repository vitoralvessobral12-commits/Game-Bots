const jwt = require('jsonwebtoken')
const Cliente = require('./../2.Modelos/cliente')
const Atendente = require('./../2.Modelos/atendente')

// Lê o "Authorization: Bearer <token>" e devolve o payload, ou null se for inválido/expirado
function lerToken(req) {
    const authHeader = req.headers.authorization

    if (typeof authHeader !== 'string') {
        return null
    }

    const [esquema, token] = authHeader.split(' ')

    if (esquema !== 'Bearer' || !token) {
        return null
    }

    try {
        // Fixa o algoritmo: só aceita tokens assinados com HS256 pelo nosso segredo
        return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] })
    } catch (error) {
        return null
    }
}

// Confere no banco se a conta do token ainda existe e está ativa.
// Sem isso, um cliente/atendente desativado continuaria usando o token até ele expirar (1h).
async function contaAtiva(decoded) {
    const Modelo = decoded.tipo === 'atendente' ? Atendente : Cliente

    const conta = await Modelo.findOne({
        where: { id: decoded.id, ativo: true },
        attributes: ['id']
    })

    return Boolean(conta)
}

module.exports = {
    lerToken,
    contaAtiva
}
