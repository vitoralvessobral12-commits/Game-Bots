const rateLimit = require('express-rate-limit')

const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { mensagem: 'Muitas requisições, tente novamente mais tarde.' }
})

const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { mensagem: 'Muitas tentativas de login. Aguarde 15 minutos.' }
})

module.exports = { limiteGeral, limiteLogin }