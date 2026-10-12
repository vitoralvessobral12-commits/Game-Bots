const express = require('express')
const router = express.Router()
const atendenteController = require('./../4.Controladores/atendenteController')
const clienteController = require('./../4.Controladores/clienteControllers')
const { autenticarAdmin } = require('./../5.Middlewares/admin/autenticarAdmin')
const { cadastroAtendente } = require('./../5.Middlewares/atendente/cadastroAtendente')
const { validarId } = require('./../5.Middlewares/clientes/validarId')
const { limiteAdmin } = require('./../5.Middlewares/limitadores')

// Área do dono do sistema. Exige o cabeçalho "x-admin-key" igual ao ADMIN_API_KEY do servidor.
// Substitui o script criarAtendente.js, que exigia rodar no servidor com acesso direto ao banco.
router.use('/admin', limiteAdmin, autenticarAdmin)

router.post('/admin/atendentes', cadastroAtendente, atendenteController.criarAtendente)

router.get('/admin/atendentes', atendenteController.listarAtendentes)

router.patch('/admin/atendentes/:id/desativar', validarId, atendenteController.desativarAtendente)

router.patch('/admin/atendentes/:id/reativar', validarId, atendenteController.reativarAtendente)

router.patch('/admin/clientes/:id/reativar', validarId, clienteController.reativarCliente)

module.exports = router
