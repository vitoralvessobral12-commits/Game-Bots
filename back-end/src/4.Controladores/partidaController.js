const partidaService = require('./../3.Serviços/partidaService')



async function criarPartida(req, res) {
    const {
        cliente1_id,
        cliente2_id,
        robo_id,
        vencedor_id
    } = req.body

    // O atendente vem do token (validado no middleware), nunca do corpo da requisição.
    // Assim ninguém consegue registrar uma partida em nome de outro atendente.
    const atendente_id = req.atendente.id

    try {
        const resultado = await partidaService.criarPartida(
            cliente1_id,
            cliente2_id,
            robo_id,
            vencedor_id,
            atendente_id
        )

        if (resultado.status !== 201) {
            return res.status(resultado.status).json({
                error: resultado.info
            })
        }

        return res.status(201).json({
            mensagem: 'Partida criada com sucesso',
            partida: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}



async function buscarPartida(req, res) {
    const { id } = req.params

    try {
        const resultado = await partidaService.buscarPartida(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Partida encontrada',
            partida: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}



async function listarPartidas(req, res) {
    try {
        const resultado = await partidaService.listarPartidas()

        return res.status(200).json({
            mensagem: 'Partidas encontradas',
            partidas: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}



async function buscarPartidaComRelacionamentos(req, res) {
    const { id } = req.params

    try {
        const resultado =
            await partidaService.buscarPartidaComRelacionamentos(id)

        if (resultado.status === 404) {
            return res.status(404).json({
                error: resultado.info
            })
        }

        return res.status(200).json({
            mensagem: 'Partida encontrada',
            partida: resultado.dados
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno do servidor'
        })
    }
}


module.exports = {
    criarPartida,
    buscarPartida,
    listarPartidas,
    buscarPartidaComRelacionamentos
}