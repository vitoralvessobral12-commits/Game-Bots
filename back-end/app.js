require('dotenv').config()
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

// Atrás de 1 proxy (hospedagem): necessário para o rate limit ver o IP real
app.set('trust proxy', 1)

// Cabeçalhos de segurança
app.use(helmet())

// CORS: só o domínio do front (definido no .env em produção)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

// Limita o tamanho do corpo das requisições
app.use(express.json({ limit: '10kb' }))

app.use(limiteGeral)
app.use(atendenteRoutes)
app.use(clienteRoutes)
app.use(partidaRoutes)
app.use(roboRoutes)
app.use(rankingRoutes)

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})


module.exports = app


