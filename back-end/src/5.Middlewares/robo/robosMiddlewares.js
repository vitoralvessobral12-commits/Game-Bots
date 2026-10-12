function validarRobo(req, res, next) {
    const { nome, categoria } = req.body || {}

    if (typeof nome !== 'string' || nome.trim().length === 0 || nome.trim().length > 40) {
        return res.status(400).json({ error: 'O nome do robô é obrigatório (até 40 caracteres)' })
    }

    if (typeof categoria !== 'string' || categoria.trim().length === 0 || categoria.trim().length > 30) {
        return res.status(400).json({ error: 'A categoria é obrigatória (até 30 caracteres)' })
    }

    req.body.nome = nome.trim()
    req.body.categoria = categoria.trim()

    next()
}

module.exports = {
    validarRobo
}
