const clienteServices = require('../3.Serviços/clienteServices')


async function criarCliente(req, res) {
    const { nome, email, senha } = req.body

    try {
        const resultado = await clienteServices.criarCliente(
            nome,
            email,
            senha
        )

        if (resultado.status !== 201) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(201).json({
            mensagem: 'Cliente cadastrado com sucesso',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function buscarCliente(req, res) {
    const { id } = req.params

    try {
        const resultado = await clienteServices.buscarCliente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Cliente encontrado',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function listarClientes(req, res) {
    try {
        const resultado = await clienteServices.listarClientes()

        return res.status(200).json({
            mensagem: 'Clientes encontrados',
            clientes: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function atualizarCliente(req, res) {
    const { id } = req.params
    const { nome, senha } = req.body

    try {
        const resultado = await clienteServices.atualizarCliente(
            id,
            nome,
            senha
        )

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Cliente atualizado com sucesso',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function desativarCliente(req, res) {
    const { id } = req.params

    try {
        const resultado = await clienteServices.desativarCliente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Cliente desativado com sucesso',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function reativarCliente(req, res) {
    const { id } = req.params

    try {
        const resultado = await clienteServices.reativarCliente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Cliente reativado com sucesso',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}

async function loginCliente(req, res) {
    const { email, senha } = req.body

    try {
        const resultado = await clienteServices.loginCliente(email, senha)

        if (resultado.status && resultado.status !== 200) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso',
            cliente: resultado.dados
        })

    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}

async function buscarPerfilCliente(req, res) {
    const clienteId = req.clienteId

    try {
        const resultado = await clienteServices.buscarPerfilCliente(clienteId)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Perfil do cliente encontrado',
            cliente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}

module.exports = {
    criarCliente,
    buscarCliente,
    listarClientes,
    atualizarCliente,
    desativarCliente,
    reativarCliente,
    loginCliente,
    buscarPerfilCliente
}