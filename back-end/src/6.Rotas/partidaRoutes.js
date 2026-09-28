const express = require('express')
const router = express.Router()

const partidaController = require('../4.Controladores/partidaController')

router.post('/partidas', partidaController.criarPartida)

router.get('/partidas', partidaController.listarPartidas)

router.get('/partidas/:id/relacionamentos', partidaController.buscarPartidaComRelacionamentos)

router.get('/partidas/:id', partidaController.buscarPartida)

module.exports = router