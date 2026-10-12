const express = require('express')
const router = express.Router()
const atendenteController = require('./../4.Controladores/atendenteController')
const { autenticarAtendente } = require('./../5.Middlewares/atendente/autenticarAtendente')
const { validarId } = require('./../5.Middlewares/clientes/validarId')
const { validarAtualizacao } = require('./../5.Middlewares/validarAtualizacao')
const { apenasProprioAtendente } = require('./../5.Middlewares/autorizar')
const { validarLogin } = require('./../5.Middlewares/clientes/cadastroCliente')
const { limiteLogin, limiteLoginIp } = require('./../5.Middlewares/limitadores')

// Criar, desativar e reativar atendentes: só pela área /admin (ver adminRoutes.js)
// ou pelo script src/Atendente/criarAtendente.js.

// Login: público (com limite de tentativas)
router.post('/atendentes/login', limiteLoginIp, limiteLogin, validarLogin, atendenteController.loginAtendente)

router.get('/atendentes', autenticarAtendente, atendenteController.listarAtendentes)

// Alterar nome/senha: cada atendente só altera os próprios dados
router.put('/atendentes/:id', autenticarAtendente, validarId, apenasProprioAtendente, validarAtualizacao, atendenteController.atualizarAtendente)

// Desativar: cada atendente só desativa a si mesmo
router.patch('/atendentes/:id/desativar', autenticarAtendente, validarId, apenasProprioAtendente, atendenteController.desativarAtendente)

// (Removido) PATCH /atendentes/:id/reativar: qualquer atendente podia reativar um colega
// desativado (ex.: alguém que saiu da equipe). Agora isso é só pela área /admin.

module.exports = router