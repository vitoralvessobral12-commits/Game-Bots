const { erroNome, erroEmail, erroSenha, normalizarEmail } = require('./../validacoes')

function validarCadastroCliente(req, res, next) {
    const { nome, email, senha } = req.body || {}

    const erro = erroNome(nome) || erroEmail(email) || erroSenha(senha)

    if (erro) {
        return res.status(400).json({ error: erro })
    }

    req.body.nome = nome.trim()
    req.body.email = normalizarEmail(email)

    next()
}

// Login (cliente e atendente): só garante que chegaram textos, sem revelar regras de senha
function validarLogin(req, res, next) {
    const { email, senha } = req.body || {}

    if (typeof email !== 'string' || typeof senha !== 'string' || !email.trim() || !senha) {
        return res.status(400).json({ error: 'Informe e-mail e senha' })
    }

    if (email.length > 100 || senha.length > 200) {
        return res.status(401).json({ error: 'E-mail ou senha inválidos' })
    }

    req.body.email = normalizarEmail(email)

    next()
}

module.exports = {
    validarCadastroCliente,
    validarLogin
}
