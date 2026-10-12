const { erroNome, erroSenha } = require('./validacoes')

// Validação do PUT de cliente e de atendente (nome obrigatório, senha opcional)
function validarAtualizacao(req, res, next) {
    const { nome, senha } = req.body || {}

    const erro = erroNome(nome) ||
        // Senha é opcional: só valida se uma nova foi enviada
        (senha !== undefined && senha !== null && senha !== '' ? erroSenha(senha) : null)

    if (erro) {
        return res.status(400).json({ error: erro })
    }

    req.body.nome = nome.trim()

    next()
}

module.exports = {
    validarAtualizacao
}
