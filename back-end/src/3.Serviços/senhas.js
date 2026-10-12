const bcrypt = require('bcrypt')

// Custo do hash: 12 é um bom equilíbrio entre segurança e velocidade
const SALT_ROUNDS = 12

// Hash "falso" usado quando o e-mail não existe, para o login levar
// o mesmo tempo com e-mail certo ou errado (evita descobrir e-mails pelo tempo de resposta).
// Fica num arquivo só para ser calculado uma vez (antes eram dois, um por service).
const HASH_FALSO = bcrypt.hashSync('senha-falsa-apenas-para-igualar-tempo', SALT_ROUNDS)

module.exports = { SALT_ROUNDS, HASH_FALSO }
