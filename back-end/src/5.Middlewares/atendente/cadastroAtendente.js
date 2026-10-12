const { erroNome, erroEmail, erroSenha, normalizarEmail } = require('./../validacoes')

function cadastroAtendente(req, res, next) {
    const { nome, email, senha } = req.body || {}

    const erro = erroNome(nome) || erroEmail(email) || erroSenha(senha)

    if (erro) {
        return res.status(400).json({ error: erro })
    }

    req.body.nome = nome.trim()
    req.body.email = normalizarEmail(email)

    next()
}

module.exports = {
    cadastroAtendente
}
