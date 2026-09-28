const express = require('express')
const router = express.Router()
const atendenteController = require('./../4.Controladores/atendenteController')
const { autenticarAtendente } = require('./../5.Middlewares/atendente/autenticarAtendente')
const { limiteLogin } = require('./../5.Middlewares/limitadores')

router.post('/atendentes', atendenteController.criarAtendente)

router.post('/atendentes/login', limiteLogin, atendenteController.loginAtendente)

router.get('/atendentes', autenticarAtendente, atendenteController.listarAtendentes)

router.put('/atendentes/:id', autenticarAtendente, atendenteController.atualizarAtendente)

router.patch('/atendentes/:id/desativar', autenticarAtendente, atendenteController.desativarAtendente)

router.patch('/atendentes/:id/reativar', autenticarAtendente, atendenteController.reativarAtendente)

module.exports = router