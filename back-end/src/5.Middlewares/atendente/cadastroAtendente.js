function cadastroAtendente(req, res, next) {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
    }

    if(typeof nome !== 'string' || typeof email !== 'string' || typeof senha !== 'string') {
        return res.status(400).json({ error: 'Todos os campos devem ser preenchidos com texto' })
    }

    if (senha.length < 8) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres' })
    }

    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Email inválido' })
    }

    if (nome.trim().length === 0 || email.trim().length === 0 || senha.trim().length === 0) {
        return res.status(400).json({ error: 'Nenhum campo pode estar vazio' })
    }

    if (nome.length > 30) {
        return res.status(400).json({ error: 'O nome deve ter no máximo 30 caracteres' })
    }

    if (email.length > 50) {
        return res.status(400).json({ error: 'O email deve ter no máximo 50 caracteres' })
    }

    if (senha.length > 30) {
        return res.status(400).json({ error: 'A senha deve ter no máximo 30 caracteres' })
    }

    if (senha.includes(' ')) {
        return res.status(400).json({ error: 'A senha não pode conter espaços' })
    }

    next()


}

module.exports = {
    cadastroAtendente
}