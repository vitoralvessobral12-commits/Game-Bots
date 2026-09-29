const express = require('express')
const router = express.Router()
const atendenteController = require('./../4.Controladores/atendenteController')
const { autenticarAtendente } = require('./../5.Middlewares/atendente/autenticarAtendente')
const { validarId } = require('./../5.Middlewares/clientes/validarId')
const { validarAtualizacao } = require('./../5.Middlewares/validarAtualizacao')
const { apenasProprioAtendente } = require('./../5.Middlewares/autorizar')
const { limiteLogin } = require('./../5.Middlewares/limitadores')

// Não existe rota para criar atendente pela API.
// Novos atendentes são criados apenas pelo script scripts/criarAtendente.js, direto no servidor.

// Login: público (com limite de tentativas)
router.post('/atendentes/login', limiteLogin, atendenteController.loginAtendente)

router.get('/atendentes', autenticarAtendente, atendenteController.listarAtendentes)

// Alterar nome/senha: cada atendente só altera os próprios dados
router.put('/atendentes/:id', autenticarAtendente, validarId, apenasProprioAtendente, validarAtualizacao, atendenteController.atualizarAtendente)

// Desativar: cada atendente só desativa a si mesmo
router.patch('/atendentes/:id/desativar', autenticarAtendente, validarId, apenasProprioAtendente, atendenteController.desativarAtendente)

router.patch('/atendentes/:id/reativar', autenticarAtendente, validarId, atendenteController.reativarAtendente)

module.exports = router