const { rateLimit, ipKeyGenerator } = require('express-rate-limit')

// Observação: o contador fica na memória do servidor. Na Vercel (serverless) cada instância
// tem sua própria memória, então o limite é "por instância". Para um limite global de verdade,
// use um store compartilhado (ex.: Redis/Upstash) no campo "store".

// Numa arena, vários jogadores usam o mesmo Wi-Fi (mesmo IP público),
// por isso o limite geral é folgado.
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas requisições, tente novamente mais tarde.' }
})

// Login: 5 tentativas ERRADAS por conta (IP + e-mail) a cada 15 min.
// Logins certos não contam, então a arena inteira pode entrar pelo mesmo Wi-Fi.
const limiteLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
    return `${ipKeyGenerator(req.ip)}|${email}`
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Aguarde 15 minutos.' }
})

// Login: teto por IP, para impedir testar muitos e-mails diferentes a partir do mesmo lugar
const limiteLoginIp = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Aguarde 15 minutos.' }
})

// Cadastro: evita criação de contas em massa (e o custo do bcrypt em cada uma)
const limiteCadastro = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitos cadastros a partir desta rede. Tente mais tarde.' }
})

// Área admin: errar a chave poucas vezes já bloqueia
const limiteAdmin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas. Aguarde 15 minutos.' }
})

module.exports = { limiteGeral, limiteLogin, limiteLoginIp, limiteCadastro, limiteAdmin }
