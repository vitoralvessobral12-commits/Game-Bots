const crypto = require('crypto')

// Área administrativa: só quem tem a chave ADMIN_API_KEY (definida no .env / Vercel) entra.
// A chave vai no cabeçalho "x-admin-key". Não existe login nem token: é uma senha mestra do dono do sistema.
const TAMANHO_MINIMO_CHAVE = 32

function chaveConfigurada() {
    const chave = process.env.ADMIN_API_KEY
    return typeof chave === 'string' && chave.length >= TAMANHO_MINIMO_CHAVE
}

// Compara em tempo constante (o tempo de resposta não revela quantos caracteres estão certos)
function chavesIguais(recebida, esperada) {
    const a = crypto.createHash('sha256').update(recebida).digest()
    const b = crypto.createHash('sha256').update(esperada).digest()
    return crypto.timingSafeEqual(a, b)
}

function autenticarAdmin(req, res, next) {
    // Sem chave forte configurada a área admin fica desligada (responde como se não existisse)
    if (!chaveConfigurada()) {
        return res.status(404).json({ error: 'Rota não encontrada' })
    }

    const recebida = req.headers['x-admin-key']

    if (typeof recebida !== 'string' || !chavesIguais(recebida, process.env.ADMIN_API_KEY)) {
        return res.status(401).json({ error: 'Acesso negado' })
    }

    req.admin = true
    next()
}

module.exports = {
    autenticarAdmin,
    TAMANHO_MINIMO_CHAVE
}
