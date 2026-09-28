const Partida = require('./../2.Modelos/partidas')
const Cliente = require('./../2.Modelos/cliente')
const Robo = require('./../2.Modelos/robos')
const Atendente = require('./../2.Modelos/atendente')



async function criarPartida(
    cliente1_id,
    cliente2_id,
    robo_id,
    vencedor_id,
    atendente_id
) {
    try {

        if (
            !cliente1_id ||
            !cliente2_id ||
            !robo_id ||
            !vencedor_id ||
            !atendente_id
        ) {
            return {
                status: 400,
                info: 'Todos os campos são obrigatórios'
            }
        }

        if (Number(cliente1_id) === Number(cliente2_id)) {
            return {
                status: 400,
                info: 'Os jogadores devem ser diferentes'
            }
        }


        const cliente1 = await Cliente.findOne({
            where: {
                id: cliente1_id,
                ativo: true
            }
        })

        if (!cliente1) {
            return {
                status: 404,
                info: 'Primeiro cliente não encontrado ou está inativo'
            }
        }


        const cliente2 = await Cliente.findOne({
            where: {
                id: cliente2_id,
                ativo: true
            }
        })

        if (!cliente2) {
            return {
                status: 404,
                info: 'Segundo cliente não encontrado ou está inativo'
            }
        }

        const robo = await Robo.findOne({
            where: {
                id: robo_id,
                ativo: true
            }
        })

        if (!robo) {
            return {
                status: 404,
                info: 'Robô não encontrado ou está inativo'
            }
        }


        const atendente = await Atendente.findOne({
            where: {
                id: atendente_id,
                ativo: true
            }
        })

        if (!atendente) {
            return {
                status: 404,
                info: 'Atendente não encontrado ou está inativo'
            }
        }

 
        if (
            Number(vencedor_id) !== Number(cliente1_id) &&
            Number(vencedor_id) !== Number(cliente2_id)
        ) {
            return {
                status: 400,
                info: 'O vencedor deve ser um dos jogadores'
            }
        }

        const partida = await Partida.create({
            cliente1_id,
            cliente2_id,
            robo_id,
            vencedor_id,
            atendente_id
        })

        return {
            status: 201,
            dados: {
                id: partida.id,
                cliente1_id: partida.cliente1_id,
                cliente2_id: partida.cliente2_id,
                robo_id: partida.robo_id,
                vencedor_id: partida.vencedor_id,
                atendente_id: partida.atendente_id,
                criado_em: partida.criado_em
            }
        }
    } catch (error) {
        throw error
    }
}



async function buscarPartida(id) {
    try {
        const partida = await Partida.findOne({
            where: {
                id
            }
        })

        if (!partida) {
            return {
                status: 404,
                info: 'Partida não encontrada'
            }
        }

        return {
            status: 200,
            dados: {
                id: partida.id,
                cliente1_id: partida.cliente1_id,
                cliente2_id: partida.cliente2_id,
                robo_id: partida.robo_id,
                vencedor_id: partida.vencedor_id,
                atendente_id: partida.atendente_id,
                criado_em: partida.criado_em
            }
        }
    } catch (error) {
        throw error
    }
}

// FUNÇÃO QUE LISTA APENAS OS DADOS DAS PARTIDAS SEM RELACIONAMENTOS

/* async function listarPartidas() {
    try {
        const partidas = await Partida.findAll()

        const dados = partidas.map((partida) => ({
            id: partida.id,
            cliente1_id: partida.cliente1_id,
            cliente2_id: partida.cliente2_id,
            robo_id: partida.robo_id,
            vencedor_id: partida.vencedor_id,
            atendente_id: partida.atendente_id,
            criado_em: partida.criado_em
        }))

        return {
            status: 200,
            dados
        }
    } catch (error) {
        throw error
    }
}   */




// FUNÇÃO DO HISTÓRICO DE PARTIDAS COM RELACIONAMENTOS
   async function listarPartidas() {
    try {
        const partidas = await Partida.findAll({
            include: [
                {
                    model: Cliente,
                    as: 'jogador1',
                    attributes: ['id', 'nome']
                },
                {
                    model: Cliente,
                    as: 'jogador2',
                    attributes: ['id', 'nome']
                },
                {
                    model: Cliente,
                    as: 'vencedor',
                    attributes: ['id', 'nome']
                },
                {
                    model: Robo,
                    as: 'robo',
                    attributes: ['id', 'nome']
                },
                {
                    model: Atendente,
                    as: 'atendente',
                    attributes: ['id', 'nome']
                }
            ],

            order: [['criado_em', 'DESC']]
        })

        const dados = partidas.map((partida) => ({
            id: partida.id,

            jogador1: partida.jogador1
                ? {
                      id: partida.jogador1.id,
                      nome: partida.jogador1.nome
                  }
                : null,

            jogador2: partida.jogador2
                ? {
                      id: partida.jogador2.id,
                      nome: partida.jogador2.nome
                  }
                : null,

            vencedor: partida.vencedor
                ? {
                      id: partida.vencedor.id,
                      nome: partida.vencedor.nome
                  }
                : null,

            robo: partida.robo
                ? {
                      id: partida.robo.id,
                      nome: partida.robo.nome
                  }
                : null,

            atendente: partida.atendente
                ? {
                      id: partida.atendente.id,
                      nome: partida.atendente.nome
                  }
                : null,

            criado_em: partida.criado_em
        }))

        return {
            status: 200,
            dados
        }
    } catch (error) {
        throw error
    }
}




async function buscarPartidaComRelacionamentos(id) {
    try {
        const partida = await Partida.findOne({
            where: {
                id
            },

            include: [
                {
                    model: Cliente,
                    as: 'jogador1',
                    attributes: ['id', 'nome']
                },

                {
                    model: Cliente,
                    as: 'jogador2',
                    attributes: ['id', 'nome']
                },

                {
                    model: Cliente,
                    as: 'vencedor',
                    attributes: ['id', 'nome']
                },

                {
                    model: Robo,
                    as: 'robo',
                    attributes: ['id', 'nome']
                },

                {
                    model: Atendente,
                    as: 'atendente',
                    attributes: ['id', 'nome']
                }
            ]
        })

        if (!partida) {
            return {
                status: 404,
                info: 'Partida não encontrada'
            }
        }

        return {
            status: 200,
            dados: {
                id: partida.id,

                jogador1: partida.jogador1
                    ? {
                          id: partida.jogador1.id,
                          nome: partida.jogador1.nome
                      }
                    : null,

                jogador2: partida.jogador2
                    ? {
                          id: partida.jogador2.id,
                          nome: partida.jogador2.nome
                      }
                    : null,

                vencedor: partida.vencedor
                    ? {
                          id: partida.vencedor.id,
                          nome: partida.vencedor.nome
                      }
                    : null,

                robo: partida.robo
                    ? {
                          id: partida.robo.id,
                          nome: partida.robo.nome
                      }
                    : null,

                atendente: partida.atendente
                    ? {
                          id: partida.atendente.id,
                          nome: partida.atendente.nome
                      }
                    : null,

                criado_em: partida.criado_em
            }
        }
    } catch (error) {
        throw error
    }
}


module.exports = {
    criarPartida,
    buscarPartida,
    listarPartidas,
    buscarPartidaComRelacionamentos
}