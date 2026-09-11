const atendenteService = require('./../3.Serviços/atendenteService')


async function criarAtendente(req, res) {
    const { nome, email, senha } = req.body

    try {
        const resultado = await atendenteService.criarAtendente(
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
            mensagem: 'Atendente cadastrado com sucesso',
            atendente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function buscarAtendente(req, res) {
    const { id } = req.params

    try {
        const resultado = await atendenteService.buscarAtendente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Atendente encontrado',
            atendente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function listarAtendentes(req, res) {
    try {
        const resultado = await atendenteService.listarAtendentes()

        return res.status(200).json({
            mensagem: 'Atendentes encontrados',
            atendentes: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function atualizarAtendente(req, res) {
    const { id } = req.params
    const { nome, senha } = req.body

    try {
        const resultado = await atendenteService.atualizarAtendente(
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
            mensagem: 'Atendente atualizado com sucesso',
            atendente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function desativarAtendente(req, res) {
    const { id } = req.params

    try {
        const resultado = await atendenteService.desativarAtendente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Atendente desativado com sucesso',
            atendente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


async function reativarAtendente(req, res) {
    const { id } = req.params

    try {
        const resultado = await atendenteService.reativarAtendente(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Atendente reativado com sucesso',
            atendente: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


module.exports = {
    criarAtendente,
    buscarAtendente,
    listarAtendentes,
    atualizarAtendente,
    desativarAtendente,
    reativarAtendente
}