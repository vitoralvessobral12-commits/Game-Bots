const express = require('express')
const cors = require('cors')
const { limiteGeral} = require('./src/5.Middlewares/limitadores')
const app = express()


// IMPORTANDO ROTAS
const atendenteRoutes = require('./src/6.Rotas/atendenteRoutes')
const clienteRoutes = require('./src/6.Rotas/clienteRoutes')
const roboRoutes = require('./src/6.Rotas/roboRoutes')
const partidaRoutes = require('./src/6.Rotas/partidaRoutes')
const rankingRoutes = require('./src/6.Rotas/rankingRoutes')

app.use(express.json())
app.use(cors())

app.set('trust proxy', 1)

app.use(limiteGeral)
app.use(atendenteRoutes)
app.use(clienteRoutes)
app.use(partidaRoutes)
app.use(roboRoutes)
app.use(rankingRoutes)

app.listen(4001, () => {
    console.log('Servidor rodando na porta 4001')
})






