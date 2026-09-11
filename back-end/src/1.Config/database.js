const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, "../../.env")})

const {Sequelize} = require("sequelize")


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    }
)

sequelize.authenticate()

.then(()=>{
    console.log('conectado ao banco com sucesso')
})
.catch((error)=>{
    console.error('erro ao se conectar:', error)
    
})

module.exports = sequelize