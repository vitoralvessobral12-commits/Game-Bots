// Uso (dentro da pasta back-end):  node src/Atendente/criarAtendente.js
// Alternativa sem acesso direto ao banco: POST /admin/atendentes com o cabeçalho x-admin-key.
// Cria um atendente direto no banco, usando o mesmo service da aplicação
// (então a senha é salva com bcrypt). Não fica exposto na API.

const path = require('path')
// O .env fica na pasta back-end (dois níveis acima deste arquivo)
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const readline = require('readline')
const sequelize = require("../1.Config/database")
const { criarAtendente } = require('../3.Serviços/atendenteServices')
const { erroNome, erroEmail, erroSenha, normalizarEmail } = require('../5.Middlewares/validacoes')

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

        // Mesmas regras da API, e e-mail normalizado igual ao login (senão o login não encontra a conta)
        const erro = erroNome(nome) || erroEmail(email) || erroSenha(senha)

        if (erro) {
            console.log(erro)
            return
        }

        const resultado = await criarAtendente(nome, normalizarEmail(email), senha)

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