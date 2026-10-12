require('dotenv').config()

// Sem JWT_SECRET o login quebra com erro 500 (jwt.sign não tem com o que assinar).
// Melhor falhar logo na subida, com a mensagem certa, do que no primeiro login.
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido nas variáveis de ambiente')
}

if (process.env.JWT_SECRET.length < 32) {
    console.warn('AVISO: JWT_SECRET curto. Use pelo menos 32 caracteres aleatórios.')
}

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { limiteGeral } = require('./src/5.Middlewares/limitadores')
const app = express()


// IMPORTANDO ROTAS
const atendenteRoutes = require('./src/6.Rotas/atendenteRoutes')
const clienteRoutes = require('./src/6.Rotas/clienteRoutes')
const roboRoutes = require('./src/6.Rotas/roboRoutes')
const partidaRoutes = require('./src/6.Rotas/partidaRoutes')
const rankingRoutes = require('./src/6.Rotas/rankingRoutes')
const adminRoutes = require('./src/6.Rotas/adminRoutes')

// Atrás de 1 proxy (hospedagem): necessário para o rate limit ver o IP real
app.set('trust proxy', 1)

// Cabeçalhos de segurança
app.use(helmet())

// CORS: só o domínio do front (definido no .env em produção)
// Aceita mais de um domínio separado por vírgula, e ignora a "/" final (causa comum de erro de CORS)
const origensPermitidas = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origem) => origem.trim().replace(/\/$/, ''))
    .filter(Boolean)

app.use(cors({
    origin: origensPermitidas,
    methods: ['GET', 'POST', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Limita o tamanho do corpo das requisições
app.use(express.json({ limit: '10kb' }))

app.use(limiteGeral)
app.use(atendenteRoutes)
app.use(clienteRoutes)
app.use(partidaRoutes)
app.use(roboRoutes)
app.use(rankingRoutes)
app.use(adminRoutes)

// Rota inexistente: responde em JSON (e não com a página HTML padrão do Express)
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' })
})

// Erros não tratados (JSON malformado, corpo grande demais, falha no banco...):
// registra no log do servidor, mas nunca devolve detalhes internos para quem chamou
app.use((error, req, res, next) => {
    const status = error.status || error.statusCode || 500

    if (status >= 500) {
        console.error(error)
    }

    res.status(status).json({
        error: status >= 500 ? 'Erro interno do servidor' : 'Requisição inválida'
    })
})

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})


module.exports = app


