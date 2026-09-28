const roboService = require('../3.Serviços/roboServices')

async function criarRobo(req, res) {
    const { nome, categoria } = req.body

    try {
        const resultado = await roboService.criarRobo(nome, categoria)

        if (resultado.status !== 201) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(201).json({
            mensagem: 'Robô cadastrado com sucesso',
            robo: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function buscarRobo(req, res) {
    const { id } = req.params

    try {
        const resultado = await roboService.buscarRobo(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Robô encontrado',
            robo: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function listarRobos(req, res) {
    try {
        const resultado = await roboService.listarRobos()

        return res.status(200).json({
            mensagem: 'Robôs encontrados',
            robos: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function atualizarRobo(req, res) {
    const { id } = req.params
    const { nome, categoria } = req.body

    try {
        const resultado = await roboService.atualizarRobo(
            id,
            nome,
            categoria
        )

        if (resultado.status !== 200) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Robô atualizado com sucesso',
            robo: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function desativarRobo(req, res) {
    const { id } = req.params

    try {
        const resultado = await roboService.desativarRobo(id)

        if (resultado.status !== 200) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Robô desativado com sucesso',
            robo: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function reativarRobo(req, res) {
    const { id } = req.params

    try {
        const resultado = await roboService.reativarRobo(id)

        if (resultado.status !== 200) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Robô reativado com sucesso',
            robo: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


module.exports = {
    criarRobo,
    buscarRobo,
    listarRobos,
    atualizarRobo,
    desativarRobo,
    reativarRobo
}