const express = require('express')
const router = express.Router()

const partidaController = require('../4.Controladores/partidaController')
const { autenticarAtendente } = require('../5.Middlewares/atendente/autenticarAtendente')
const { validarId } = require('../5.Middlewares/clientes/validarId')
const { validarPartida, validarPaginacao } = require('../5.Middlewares/partida/partidaMiddlewares')

// Registrar partida: só atendente logado
router.post('/partidas', autenticarAtendente, validarPartida, partidaController.criarPartida)

// Histórico: público (a página /historico é aberta)
router.get('/partidas', validarPaginacao, partidaController.listarPartidas)

router.get('/partidas/:id/relacionamentos', validarId, partidaController.buscarPartidaComRelacionamentos)

router.get('/partidas/:id', validarId, partidaController.buscarPartida)

module.exports = router