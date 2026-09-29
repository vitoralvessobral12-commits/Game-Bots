// Uso (dentro da pasta back-end):  node scripts/criarAtendente.js
// Cria um atendente direto no banco, usando o mesmo service da aplicação
// (então a senha é salva com bcrypt). Não fica exposto na API.

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const readline = require('readline')
const sequelize = require("../1.Config/database")
const { criarAtendente } = require('../3.Serviços/atendenteServices')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function perguntar(texto) {
    return new Promise((resolve) => rl.question(texto, resolve))
}

async function main() {
    try {
        const nome = (await perguntar('Nome: ')).trim()
        const email = (await perguntar('Email: ')).trim()
        // Perguntar aqui evita deixar a senha salva no histórico do terminal
        const senha = await perguntar('Senha (mínimo 8 caracteres): ')

        if (!nome || !email || !senha) {
            console.log('Todos os campos são obrigatórios.')
            return
        }

        if (!email.includes('@') || !email.includes('.')) {
            console.log('Email inválido.')
            return
        }

        if (senha.length < 8) {
            console.log('A senha deve ter no mínimo 8 caracteres.')
            return
        }

        const resultado = await criarAtendente(nome, email, senha)

        if (resultado.status !== 201) {
            console.log('Não foi possível criar:', resultado.info)
            return
        }

        console.log('Atendente criado com sucesso:', resultado.dados)
    } catch (error) {
        console.error('Erro ao criar atendente:', error.message)
    } finally {
        rl.close()
        await sequelize.close()
    }
}

main()