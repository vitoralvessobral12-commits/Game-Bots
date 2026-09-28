const express = require('express')
const router = express.Router()
const clienteController = require('./../4.Controladores/clienteControllers')
const { autenticarCliente } = require('./../5.Middlewares/clientes/autenticarCliente')
const { limiteLogin } = require('./../5.Middlewares/limitadores')

router.post('/clientes', clienteController.criarCliente)

router.post('/clientes/login', limiteLogin, clienteController.loginCliente)

router.get(
    '/clientes/perfil',
    autenticarCliente,
    clienteController.buscarPerfilCliente
)

router.get(
    '/clientes',
    autenticarCliente,
    clienteController.listarClientes
)

router.get(
    '/clientes/:id',
    autenticarCliente,
    clienteController.buscarCliente
)

router.put(
    '/clientes/:id',
    autenticarCliente,
    clienteController.atualizarCliente
)

router.patch(
    '/clientes/:id/desativar',
    autenticarCliente,
    clienteController.desativarCliente
)

router.patch(
    '/clientes/:id/reativar',
    autenticarCliente,
    clienteController.reativarCliente
)

module.exports = router
