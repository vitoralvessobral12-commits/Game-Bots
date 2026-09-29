// Validação do PUT de cliente e de atendente (nome obrigatório, senha opcional)
function validarAtualizacao(req, res, next) {
    const { nome, senha } = req.body

    if (typeof nome !== 'string' || nome.trim().length === 0) {
        return res.status(400).json({ error: 'O nome é obrigatório e deve ser texto' })
    }

    if (nome.length > 30) {
        return res.status(400).json({ error: 'O nome deve ter no máximo 30 caracteres' })
    }

    // Senha é opcional: só valida se uma nova foi enviada
    if (senha !== undefined && senha !== null && senha !== '') {
        if (typeof senha !== 'string') {
            return res.status(400).json({ error: 'A senha deve ser texto' })
        }

        if (senha.length < 8) {
            return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' })
        }

        if (senha.length > 30) {
            return res.status(400).json({ error: 'A senha deve ter no máximo 30 caracteres' })
        }

        if (senha.includes(' ')) {
            return res.status(400).json({ error: 'A senha não pode conter espaços' })
        }
    }

    next()
}

module.exports = {
    validarAtualizacao
}