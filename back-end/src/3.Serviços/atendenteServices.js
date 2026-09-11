const Atendente = require('./../2.Modelos/atendente')


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

        const atendente = await Atendente.create({
            nome,
            email,
            senha,
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

        await atendente.update({
            nome,
            senha
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


module.exports = {
    criarAtendente,
    buscarAtendente,
    listarAtendentes,
    atualizarAtendente,
    desativarAtendente,
    reativarAtendente
}