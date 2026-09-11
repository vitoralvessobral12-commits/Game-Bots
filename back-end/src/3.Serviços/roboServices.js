const Robo = require('./../2.Modelos/robos')

// CRIAR ROBÔ
async function criarRobo(nome, categoria) {
    try {
        const nomeExiste = await Robo.findOne({
            where: { nome }
        })

        if (nomeExiste) {
            return {
                status: 400,
                info: 'Nome do robô já cadastrado'
            }
        }

        const robo = await Robo.create({
            nome,
            categoria,
            ativo: true
        })

        return {
            status: 201,
            dados: {
                id: robo.id,
                nome: robo.nome,
                categoria: robo.categoria,
                ativo: robo.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


// BUSCAR ROBÔ
async function buscarRobo(id) {
    try {
        const robo = await Robo.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!robo) {
            return {
                status: 404,
                info: 'Robô não encontrado'
            }
        }

        return {
            status: 200,
            dados: {
                id: robo.id,
                nome: robo.nome,
                categoria: robo.categoria,
                ativo: robo.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


// LISTAR ROBÔS
async function listarRobos() {
    try {
        const robos = await Robo.findAll({
            where: {
                ativo: true
            }
        })

        const dados = robos.map((robo) => ({
            id: robo.id,
            nome: robo.nome,
            categoria: robo.categoria,
            ativo: robo.ativo
        }))

        return {
            status: 200,
            dados
        }
    } catch (error) {
        throw error
    }
}


// ATUALIZAR ROBÔ
async function atualizarRobo(id, nome, categoria) {
    try {
        const robo = await Robo.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!robo) {
            return {
                status: 404,
                info: 'Robô não encontrado'
            }
        }

        // Verifica se o novo nome pertence a outro robô
        const nomeExiste = await Robo.findOne({
            where: {
                nome
            }
        })

        if (nomeExiste && nomeExiste.id !== Number(id)) {
            return {
                status: 400,
                info: 'Nome do robô já cadastrado'
            }
        }

        await robo.update({
            nome,
            categoria
        })

        return {
            status: 200,
            dados: {
                id: robo.id,
                nome: robo.nome,
                categoria: robo.categoria,
                ativo: robo.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


// DESATIVAR ROBÔ
async function desativarRobo(id) {
    try {
        const robo = await Robo.findOne({
            where: {
                id,
                ativo: true
            }
        })

        if (!robo) {
            return {
                status: 404,
                info: 'Robô não encontrado'
            }
        }

        await robo.update({
            ativo: false
        })

        return {
            status: 200,
            dados: {
                id: robo.id,
                nome: robo.nome,
                categoria: robo.categoria,
                ativo: robo.ativo
            }
        }
    } catch (error) {
        throw error
    }
}


// REATIVAR ROBÔ
async function reativarRobo(id) {
    try {
        const robo = await Robo.findOne({
            where: {
                id
            }
        })

        if (!robo) {
            return {
                status: 404,
                info: 'Robô não encontrado'
            }
        }

        await robo.update({
            ativo: true
        })

        return {
            status: 200,
            dados: {
                id: robo.id,
                nome: robo.nome,
                categoria: robo.categoria,
                ativo: robo.ativo
            }
        }
    } catch (error) {
        throw error
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