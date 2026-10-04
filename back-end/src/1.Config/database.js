const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

const { Sequelize } = require('sequelize')

// Certificado CA do provedor (conteúdo do arquivo) em DB_SSL_CA.
// Aceita "\n" literal caso a Vercel guarde em uma linha só.
const ca = process.env.DB_SSL_CA
    ? process.env.DB_SSL_CA.replace(/\\n/g, '\n')
    : null

console.log('DB_HOST definido?', !!process.env.DB_HOST)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        dialectModule: require('mysql2'),
        logging: false,
        pool: {
            max: 2,
            min: 0,
            idle: 10000,
            acquire: 30000
        },
        dialectOptions: ca
            ? { ssl: { ca, rejectUnauthorized: true } }
            : {}
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('conectado ao banco com sucesso')
    })
    .catch((error) => {
        console.error('erro ao se conectar:', error)
    })

module.exports = sequelize