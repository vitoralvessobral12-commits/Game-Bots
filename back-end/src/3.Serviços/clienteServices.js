const Cliente = require('./../2.Modelos/cliente')


async function criarCliente(nome, email, senha, codigo_identificacao){
    try {
        const emailExiste = await Cliente.findOne({where: {email: email}})
        
        if(emailExiste){
            return {status: 400, info: "email ja cadastrado", erro: "email ja cadastrado"}
        }
 const cliente = await Cliente.create({
        nome: nome,
        codigo_identificacao: codigo_identificacao,
        email: email,
        senha: senha
        })
        
        return {
            dados:{
                id: cliente.dataValues.id, 
                nome: cliente.dataValues.nome, 
                codigo_identificacao: cliente.dataValues.codigo_identificacao, 
                email: cliente.dataValues.email
            }
        }

    } catch (error) {
        console.log(error)
    }
}


async function buscarCliente(id){

    try {
        const procurarCliente = await Cliente.findOne({where: {id: id}})
    
       
        
        if(procurarCliente){
           return {
            dados:{
                id: procurarCliente.dataValues.id, 
                nome: procurarCliente.dataValues.nome, 
                codigo_identificacao: procurarCliente.dataValues.codigo_identificacao, 
                email: procurarCliente.dataValues.email
            }
            
        }
        }
        return{
          
        }
        
    } catch (error) {
        console.log(error)
    }
}


async function listarClientes(){
    try {
        
        const rastrearClientes = await Cliente.findAll({where:{ativo: true}})

        const dados = rastrearClientes.map((cliente)=>{
            return {
                id: cliente.dataValues.id, 
                nome: cliente.dataValues.nome, 
                codigo_identificacao: cliente.dataValues.codigo_identificacao
            }

        })
        
        return{dados}
    
    } catch (error) {
        console.log(error)
    }
}

async function atualizarCliente(id, nome, senha){
    try {
        const procurarCliente = await Cliente.findOne({where: {id: id}})
            if(procurarCliente){
               await Cliente.update(
                {nome, senha},
                 {where:{id}})
                return {
                }
                }
                return{
                    status:404,
                    info: 'cliente não encontrado'
                }


    } catch (error) {
        console.log(error)
    }
}


async function desativarCliente(id){
    try {
        const procurarCliente = await Cliente.findOne({where: {id: id}})
            if(procurarCliente){
                await Cliente.update({ativo: false},
                    {where: {id: id}})

                return{
                }
            }

            return{
                status:404,
                info: 'cliente não encontrado'
            }

    } catch (error) {
        console.log(error)
    }
}


async function reativarCliente(id){
    try {
        const procurarCliente = await Cliente.findOne({where: {id: id}})
            if(procurarCliente){
                await Cliente.update({ativo: true},
                    {where: {id: id}})

                return{
                }
            }

            return{
                status:404,
                info: 'cliente não encontrado'
            }
    } catch (error) {
        console.log(error)
    }
}




module.exports = {buscarCliente, criarCliente, listarClientes, atualizarCliente, desativarCliente, reativarCliente}