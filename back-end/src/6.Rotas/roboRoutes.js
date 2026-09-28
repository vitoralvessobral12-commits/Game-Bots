const express = require('express')
const router = express.Router()

const roboController = require('../4.Controladores/roboControllers')

router.post('/robos', roboController.criarRobo)

router.get('/robos', roboController.listarRobos)

router.get('/robos/:id', roboController.buscarRobo)

router.put('/robos/:id', roboController.atualizarRobo)

router.patch('/robos/:id/desativar', roboController.desativarRobo)

router.patch('/robos/:id/reativar', roboController.reativarRobo)

module.exports = router