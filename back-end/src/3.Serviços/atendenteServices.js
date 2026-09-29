const Atendente = require('./../2.Modelos/atendente')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Custo do hash: 12 é um bom equilíbrio entre segurança e velocidade
const SALT_ROUNDS = 12

// Hash "falso" usado quando o e-mail não existe, para o login levar
// o mesmo tempo com e-mail certo ou errado (evita descobrir e-mails pelo tempo de resposta)
const HASH_FALSO = bcrypt.hashSync('senha-falsa-apenas-para-igualar-tempo', SALT_ROUNDS)

async function criarAtendente(nome, email, senha) {
    try {
        const emailExiste = await Atendente.findOne({
            where: { email }
        })

        if (emailExiste) {
            return {
                status: 400,
                info: 'Email já cadastrado'
            }
        }

        // A senha NUNCA vai crua para o banco: salvamos apenas o hash
        const senhaHash = await bcrypt.hash(senha, SALT_ROUNDS)

        const atendente = await Atendente.create({
            nome,
            email,
            senha: senhaHash,
            ativo: true
        })

        return {
            status: 201,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                ativo: atendente.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


async function buscarAtendente(id) {
    try {
        const atendente = await Atendente.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!atendente) {
            return {
                status: 404,
                info: 'Atendente não encontrado'
            }
        }

        return {
            status: 200,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                ativo: atendente.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


async function listarAtendentes() {
    try {
        const atendentes = await Atendente.findAll({
            where: {
                ativo: true
            }
        })

        const dados = atendentes.map((atendente) => ({
            id: atendente.id,
            nome: atendente.nome,
            email: atendente.email,
            ativo: atendente.ativo
        }))

        return {
            status: 200,
            dados
        }
    } catch (error) {
        throw error
    }
}


async function atualizarAtendente(id, nome, senha) {
    try {
        const atendente = await Atendente.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!atendente) {
            return {
                status: 404,
                info: 'Atendente não encontrado'
            }
        }

        const dadosAtualizados = { nome }

        // Só troca a senha se uma nova foi enviada, e sempre com hash
        if (senha) {
            dadosAtualizados.senha = await bcrypt.hash(senha, SALT_ROUNDS)
        }

        await atendente.update(dadosAtualizados)

        return {
            status: 200,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                ativo: atendente.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


async function desativarAtendente(id) {
    try {
        const atendente = await Atendente.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!atendente) {
            return {
                status: 404,
                info: 'Atendente não encontrado'
            }
        }

        await atendente.update({
            ativo: false
        })

        return {
            status: 200,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                ativo: atendente.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


async function reativarAtendente(id) {
    try {
        const atendente = await Atendente.findOne({
            where: {
                id
            }
        })

        if (!atendente) {
            return {
                status: 404,
                info: 'Atendente não encontrado'
            }
        }

        await atendente.update({
            ativo: true
        })

        return {
            status: 200,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                ativo: atendente.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


async function loginAtendente(email, senha) {
    try {
        const atendente = await Atendente.findOne({
            where: {
                email,
                ativo: true
            }
        })

        // Sempre executa o compare (mesmo sem atendente) para manter o tempo parecido
        const hashParaComparar = atendente ? atendente.senha : HASH_FALSO

        const senhaConfere = await bcrypt.compare(senha || '', hashParaComparar)

        // Mesma resposta para "e-mail não existe" e "senha errada"
        if (!atendente || !senhaConfere) {
            return {
                status: 401,
                info: 'E-mail ou senha inválidos'
            }
        }

        const token = jwt.sign({
            id: atendente.id,
            email: atendente.email,
            tipo: 'atendente'
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        return {
            status: 200,
            dados: {
                id: atendente.id,
                nome: atendente.nome,
                email: atendente.email,
                token
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    criarAtendente,
    buscarAtendente,
    listarAtendentes,
    atualizarAtendente,
    desativarAtendente,
    reativarAtendente,
    loginAtendente
}