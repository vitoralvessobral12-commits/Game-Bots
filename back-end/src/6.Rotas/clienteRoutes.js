const express = require('express')
const router = express.Router()
const clienteController = require('./../4.Controladores/clienteControllers')
const { autenticarCliente } = require('./../5.Middlewares/clientes/autenticarCliente')
const { autenticarAtendente } = require('./../5.Middlewares/atendente/autenticarAtendente')
const { validarCadastroCliente, validarLogin } = require('./../5.Middlewares/clientes/cadastroCliente')
const { validarId } = require('./../5.Middlewares/clientes/validarId')
const { validarAtualizacao } = require('./../5.Middlewares/validarAtualizacao')
const {
    autenticarUsuario,
    proprioClienteOuAtendente,
    apenasProprioCliente
} = require('./../5.Middlewares/autorizar')
const { limiteLogin, limiteLoginIp, limiteCadastro } = require('./../5.Middlewares/limitadores')

// Cadastro e login: públicos
router.post('/clientes', limiteCadastro, validarCadastroCliente, clienteController.criarCliente)

router.post('/clientes/login', limiteLoginIp, limiteLogin, validarLogin, clienteController.loginCliente)

// Perfil do próprio cliente logado
router.get(
    '/clientes/perfil',
    autenticarCliente,
    clienteController.buscarPerfilCliente
)

// Vitórias, derrotas e últimas partidas do cliente logado
router.get(
    '/clientes/perfil/partidas',
    autenticarCliente,
    clienteController.buscarPartidasDoCliente
)

// Atendente identifica o jogador pelo código (ex.: CLI00001)
router.get(
    '/clientes/codigo/:codigo',
    autenticarAtendente,
    (req, res, next) => /^CLI\d{5,10}$/i.test(req.params.codigo)
        ? next()
        : res.status(400).json({ error: 'Código inválido' }),
    clienteController.buscarClientePorCodigo
)

// Lista de todos os clientes: só atendente
router.get(
    '/clientes',
    autenticarAtendente,
    clienteController.listarClientes
)

// Ver um cliente: o próprio cliente ou um atendente
router.get(
    '/clientes/:id',
    autenticarUsuario,
    validarId,
    proprioClienteOuAtendente,
    clienteController.buscarCliente
)

// Alterar nome/senha: só o próprio cliente
router.put(
    '/clientes/:id',
    autenticarUsuario,
    validarId,
    apenasProprioCliente,
    validarAtualizacao,
    clienteController.atualizarCliente
)

// Desativar: o próprio cliente ou um atendente
router.patch(
    '/clientes/:id/desativar',
    autenticarUsuario,
    validarId,
    proprioClienteOuAtendente,
    clienteController.desativarCliente
)

// Reativar: só atendente (cliente desativado nem consegue fazer login)
router.patch(
    '/clientes/:id/reativar',
    autenticarAtendente,
    validarId,
    clienteController.reativarCliente
)

module.exports = router