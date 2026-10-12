const crypto = require('crypto')
const { Op } = require('sequelize')
const sequelize = require('./../1.Config/database')
const Cliente = require('./../2.Modelos/cliente')
const Partida = require('./../2.Modelos/partidas')
const Robo = require('./../2.Modelos/robos')
const { HASH_FALSO, SALT_ROUNDS } = require('./senhas')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function criarCliente(nome, email, senha) {
    const emailExiste = await Cliente.findOne({
        where: { email: email }
    })

    if (emailExiste) {
        return {
            status: 400,
            info: 'email ja cadastrado'
        }
    }

    // A senha NUNCA vai crua para o banco: salvamos apenas o hash
    const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

    // O código vem do próprio id (único e gerado pelo banco). Antes ele era calculado a partir do
    // "último cliente", e dois cadastros ao mesmo tempo podiam gerar o mesmo código.
    const cliente = await sequelize.transaction(async (transaction) => {
        const novo = await Cliente.create({
            nome: nome,
            codigo_identificacao: `TMP-${crypto.randomUUID()}`,
            email: email,
            senha: senhaHash
        }, { transaction })

        await novo.update({
            codigo_identificacao: `CLI${String(novo.id).padStart(5, '0')}`
        }, { transaction })

        return novo
    })

    return {
        status: 201,
        dados: {
            id: cliente.id,
            nome: cliente.nome,
            codigo_identificacao: cliente.codigo_identificacao,
            email: cliente.email
        }
    }
}


async function buscarCliente(id) {

    try {
        const procurarCliente = await Cliente.findOne({ where: { id: id } })

        if (procurarCliente) {
            return {
                dados: {
                    id: procurarCliente.dataValues.id,
                    nome: procurarCliente.dataValues.nome,
                    codigo_identificacao: procurarCliente.dataValues.codigo_identificacao,
                    email: procurarCliente.dataValues.email
                }
            }
        }

        return {
            status: 404,
            info: 'Cliente não encontrado'
        }

    } catch (error) {
        throw error
    }
}


async function listarClientes() {
    try {

        const rastrearClientes = await Cliente.findAll({ where: { ativo: true } })

        const dados = rastrearClientes.map((cliente) => {
            return {
                id: cliente.dataValues.id,
                nome: cliente.dataValues.nome,
                codigo_identificacao: cliente.dataValues.codigo_identificacao
            }
        })

        return { dados }

    } catch (error) {
        throw error
    }
}


async function atualizarCliente(id, nome, senha) {
    try {
        const procurarCliente = await Cliente.findOne({ where: { id: id } })

        if (procurarCliente) {
            const dadosAtualizados = { nome }

            // Só troca a senha se uma nova foi enviada, e sempre com hash
            if (senha) {
                dadosAtualizados.senha = await bcrypt.hash(senha, SALT_ROUNDS)
            }

            await Cliente.update(dadosAtualizados, { where: { id } })

            return {}
        }

        return {
            status: 404,
            info: 'cliente não encontrado'
        }

    } catch (error) {
        throw error
    }
}


async function desativarCliente(id) {
    try {
        const procurarCliente = await Cliente.findOne({ where: { id: id } })

        if (procurarCliente) {
            await Cliente.update({ ativo: false },
                { where: { id: id } })

            return {}
        }

        return {
            status: 404,
            info: 'cliente não encontrado'
        }

    } catch (error) {
        throw error
    }
}


async function reativarCliente(id) {
    try {
        const procurarCliente = await Cliente.findOne({ where: { id: id } })

        if (procurarCliente) {
            await Cliente.update({ ativo: true },
                { where: { id: id } })

            return {}
        }

        return {
            status: 404,
            info: 'cliente não encontrado'
        }

    } catch (error) {
        throw error
    }
}


async function loginCliente(email, senha) {
    try {

        const procurarCliente = await Cliente.findOne({
            where: { email: email }
        })

        // Sempre executa o compare (mesmo sem cliente) para manter o tempo parecido
        const hashParaComparar = procurarCliente
            ? procurarCliente.dataValues.senha
            : HASH_FALSO

        const senhaConfere = await bcrypt.compare(senha || '', hashParaComparar)

        // Mesma resposta para "e-mail não existe" e "senha errada"
        if (!procurarCliente || !senhaConfere) {
            return {
                status: 401,
                info: 'E-mail ou senha inválidos'
            }
        }

        // Só quem provou a senha correta descobre que a conta está desativada
        if (procurarCliente.dataValues.ativo === false) {
            return {
                status: 403,
                info: 'Conta desativada'
            }
        }

        const token = jwt.sign(
            {
                id: procurarCliente.dataValues.id,
                tipo: 'cliente'
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        )

        return {
            status: 200,
            dados: {
                id: procurarCliente.dataValues.id,
                nome: procurarCliente.dataValues.nome,
                email: procurarCliente.dataValues.email,
                codigo_identificacao:
                    procurarCliente.dataValues.codigo_identificacao,
                token
            }
        }

    } catch (error) {
        throw error
    }
}


async function buscarPerfilCliente(clienteId) {
    try {
        const procurarCliente = await Cliente.findByPk(clienteId)

        if (!procurarCliente) {
            return {
                status: 404,
                info: 'Cliente não encontrado'
            }
        }

        return {
            status: 200,
            dados: {
                id: procurarCliente.dataValues.id,
                nome: procurarCliente.dataValues.nome,
                email: procurarCliente.dataValues.email,
                codigo_identificacao: procurarCliente.dataValues.codigo_identificacao
            }
        }

    } catch (error) {
        throw error
    }
}


// Atendente identifica o jogador pelo código (CLI00001) sem baixar a lista inteira de clientes
async function buscarClientePorCodigo(codigo) {
    const cliente = await Cliente.findOne({
        where: { codigo_identificacao: codigo, ativo: true },
        attributes: ['id', 'nome', 'codigo_identificacao']
    })

    if (!cliente) {
        return {
            status: 404,
            info: 'Nenhum jogador ativo com esse código'
        }
    }

    return {
        status: 200,
        dados: {
            id: cliente.id,
            nome: cliente.nome,
            codigo_identificacao: cliente.codigo_identificacao
        }
    }
}


// Estatísticas e últimas partidas do cliente logado, calculadas no banco
async function buscarPartidasDoCliente(clienteId) {
    const doCliente = {
        [Op.or]: [{ cliente1_id: clienteId }, { cliente2_id: clienteId }]
    }

    const [total, vitorias, ultimas] = await Promise.all([
        Partida.count({ where: doCliente }),
        Partida.count({ where: { vencedor_id: clienteId } }),
        Partida.findAll({
            where: doCliente,
            include: [
                { model: Cliente, as: 'jogador1', attributes: ['id', 'nome'] },
                { model: Cliente, as: 'jogador2', attributes: ['id', 'nome'] },
                { model: Robo, as: 'robo', attributes: ['id', 'nome'] }
            ],
            order: [['criado_em', 'DESC']],
            limit: 5
        })
    ])

    return {
        status: 200,
        dados: {
            total,
            vitorias,
            derrotas: total - vitorias,
            ultimas: ultimas.map((partida) => ({
                id: partida.id,
                jogador1: partida.jogador1 ? { id: partida.jogador1.id, nome: partida.jogador1.nome } : null,
                jogador2: partida.jogador2 ? { id: partida.jogador2.id, nome: partida.jogador2.nome } : null,
                vencedor_id: partida.vencedor_id,
                robo: partida.robo ? { id: partida.robo.id, nome: partida.robo.nome } : null,
                criado_em: partida.criado_em
            }))
        }
    }
}

module.exports = {
    buscarCliente,
    criarCliente,
    listarClientes,
    atualizarCliente,
    desativarCliente,
    reativarCliente,
    loginCliente,
    buscarPerfilCliente,
    buscarClientePorCodigo,
    buscarPartidasDoCliente
}