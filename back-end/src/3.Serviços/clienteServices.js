const Cliente = require('./../2.Modelos/cliente')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Custo do hash: 12 é um bom equilíbrio entre segurança e velocidade
const SALT_ROUNDS = 12

// Hash "falso" usado quando o e-mail não existe, para o login levar
// o mesmo tempo com e-mail certo ou errado (evita descobrir e-mails pelo tempo de resposta)
const HASH_FALSO = bcrypt.hashSync('senha-falsa-apenas-para-igualar-tempo', SALT_ROUNDS)

async function criarCliente(nome, email, senha) {
    try {

        const emailExiste = await Cliente.findOne({
            where: { email: email }
        })

        if (emailExiste) {
            return {
                status: 400,
                info: 'email ja cadastrado',
                erro: 'email ja cadastrado'
            }
        }

        const ultimoCliente = await Cliente.findOne({
            order: [['id', 'DESC']]
        })

        let proximoNumero = 0

        if (ultimoCliente) {
            const ultimoCodigo = ultimoCliente.dataValues.codigo_identificacao

            proximoNumero = parseInt(
                ultimoCodigo.replace('CLI', ''),
                10
            ) + 1
        }

        const codigo_identificacao =
            `CLI${String(proximoNumero).padStart(5, '0')}`

        // A senha NUNCA vai crua para o banco: salvamos apenas o hash
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

        const cliente = await Cliente.create({
            nome: nome,
            codigo_identificacao: codigo_identificacao,
            email: email,
            senha: senhaHash
        })

        return {
            status: 201,
            dados: {
                id: cliente.dataValues.id,
                nome: cliente.dataValues.nome,
                codigo_identificacao: cliente.dataValues.codigo_identificacao,
                email: cliente.dataValues.email
            }
        }

    } catch (error) {
        console.log(error)

        return {
            status: 500,
            info: 'Erro ao criar cliente'
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)

        return {
            status: 500,
            info: 'Erro ao realizar login'
        }
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
        console.log(error)
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
    buscarPerfilCliente
}