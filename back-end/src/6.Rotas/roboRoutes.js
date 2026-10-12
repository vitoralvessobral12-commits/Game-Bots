const express = require('express')
const router = express.Router()

const roboController = require('../4.Controladores/roboControllers')
const { autenticarAtendente } = require('../5.Middlewares/atendente/autenticarAtendente')
const { validarId } = require('../5.Middlewares/clientes/validarId')
const { validarRobo } = require('../5.Middlewares/robo/robosMiddlewares')

// Escrita: só atendente logado
router.post('/robos', autenticarAtendente, validarRobo, roboController.criarRobo)

router.put('/robos/:id', autenticarAtendente, validarId, validarRobo, roboController.atualizarRobo)

router.patch('/robos/:id/desativar', autenticarAtendente, validarId, roboController.desativarRobo)

router.patch('/robos/:id/reativar', autenticarAtendente, validarId, roboController.reativarRobo)

// Leitura: pública
router.get('/robos', roboController.listarRobos)

router.get('/robos/:id', validarId, roboController.buscarRobo)

module.exports = router