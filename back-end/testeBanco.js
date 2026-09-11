// arquivo raiz da aplicação, para teste

const sequelize = require('./src/1.Config/database')

const Cliente = require('./src/2.Modelos/cliente')
const Robo = require('./src/2.Modelos/robos')
const Atendente = require('./src/2.Modelos/atendente')
const Partida = require('./src/2.Modelos/partidas')

// CLIENTE SERVICE
const {
    buscarCliente,
    criarCliente,
    listarClientes,
    atualizarCliente,
    desativarCliente,
    reativarCliente
} = require('./src/3.Serviços/clienteServices')

// ROBO SERVICE
const {
    criarRobo,
    buscarRobo,
    listarRobos,
    atualizarRobo,
    desativarRobo,
    reativarRobo
} = require('./src/3.Serviços/roboServices')

// PARTIDA SERVICE

const {
    criarPartida,buscarPartida, listarPartidas, buscarPartidaComRelacionamentos
} = require('./src/3.Serviços/partidaService')

async function testar() {

    try {

        await sequelize.authenticate()
        console.log('Banco conectado!')

   /* await sequelize.sync({ alter: true })
    console.log('Banco sincronizado!')    */
        // =====================================================
        // TESTES DO CLIENTE SERVICE
        // =====================================================



/*
        console.log('\n===== CLIENTE SERVICE =====')

        // CRIAR CLIENTE
        const clienteCriado = await criarCliente(
            'Vitor',
            'vitor12@gmail.com',
            '547813',
            'CLI003'
        )

        console.log('\nCriar cliente:')
        console.dir(clienteCriado, { depth: null })


        // BUSCAR CLIENTE
        const clienteEncontrado = await buscarCliente(3)

        console.log('\nBuscar cliente:')
        console.dir(clienteEncontrado, { depth: null })


        // LISTAR CLIENTES
        const clientes = await listarClientes()

        console.log('\nListar clientes:')
        console.dir(clientes, { depth: null })


        // ATUALIZAR CLIENTE
        const clienteAtualizado = await atualizarCliente(
            3,
            'Vitor Atualizado',
            '123456'
        )

        console.log('\nAtualizar cliente:')
        console.dir(clienteAtualizado, { depth: null })


        // DESATIVAR CLIENTE
        const clienteDesativado = await desativarCliente(3)

        console.log('\nDesativar cliente:')
        console.dir(clienteDesativado, { depth: null })


        // LISTAR NOVAMENTE
        const clientesDepoisDesativacao = await listarClientes()

        console.log('\nClientes depois da desativação:')
        console.dir(clientesDepoisDesativacao, { depth: null })


        // REATIVAR CLIENTE
        const clienteReativado = await reativarCliente(3)

        console.log('\nReativar cliente:')
        console.dir(clienteReativado, { depth: null })


        // LISTAR NOVAMENTE
        const clientesDepoisReativacao = await listarClientes()

        console.log('\nClientes depois da reativação:')
        console.dir(clientesDepoisReativacao, { depth: null })

*/



/*
        // =====================================================
        // TESTES DO ROBO SERVICE
        // =====================================================



        console.log('\n===== ROBO SERVICE =====')


        // CRIAR ROBO
        const roboCriado = await criarRobo(
            'Robo Teste',
            'Luta',
            true
        )

        console.log('\nCriar robo:')
        console.dir(roboCriado, { depth: null })


        // BUSCAR ROBO
        const roboEncontrado = await buscarRobo(2)

        console.log('\nBuscar robo:')
        console.dir(roboEncontrado, { depth: null })


        // LISTAR ROBOS
        const robos = await listarRobos()

        console.log('\nListar robos:')
        console.dir(robos, { depth: null })


        // ATUALIZAR ROBO
        const roboAtualizado = await atualizarRobo(
            2,
            'Robo Teste Atualizado',
            'Velocidade',
            true
        )

        console.log('\nAtualizar robo:')
        console.dir(roboAtualizado, { depth: null })


        // DESATIVAR ROBO
        const roboDesativado = await desativarRobo(2)

        console.log('\nDesativar robo:')
        console.dir(roboDesativado, { depth: null })


        // LISTAR NOVAMENTE
        const robosDepoisDesativacao = await listarRobos()

        console.log('\nRobos depois da desativação:')
        console.dir(robosDepoisDesativacao, { depth: null })


        // REATIVAR ROBO
        const roboReativado = await reativarRobo(2)

        console.log('\nReativar robo:')
        console.dir(roboReativado, { depth: null })


        // LISTAR NOVAMENTE
        const robosDepoisReativacao = await listarRobos()

        console.log('\nRobos depois da reativação:')
        console.dir(robosDepoisReativacao, { depth: null })

*/



// TESTE CRIAÇÃO DE PARTIDA

/* const partidaCriada = await criarPartida(2, 1, 2, 2, 1)

console.log('\nCriar partida:')
console.dir(partidaCriada, { depth: null })
*/

/* const partidas = await listarPartidas()

console.log('\nListar partidas:')
console.dir(partidas, { depth: null }) */

const partidaEncontrada = await buscarPartidaComRelacionamentos(1)

console.log('\nBuscar partida com relacionamentos:')
console.dir(partidaEncontrada, { depth: null })



        console.log('\n===== TESTES FINALIZADOS =====')


    } catch (erro) {
        console.error('Erro:', erro)
    }

}


testar()