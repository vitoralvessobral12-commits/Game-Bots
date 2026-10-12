// Regras de validação compartilhadas. Cada função devolve a mensagem de erro, ou null se estiver ok.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function erroNome(nome) {
    if (typeof nome !== 'string' || nome.trim().length === 0) {
        return 'O nome é obrigatório e deve ser texto'
    }

    if (nome.trim().length > 30) {
        return 'O nome deve ter no máximo 30 caracteres'
    }

    return null
}

function erroEmail(email) {
    if (typeof email !== 'string' || email.trim().length === 0) {
        return 'O e-mail é obrigatório e deve ser texto'
    }

    if (email.trim().length > 100) {
        return 'O e-mail deve ter no máximo 100 caracteres'
    }

    if (!EMAIL_REGEX.test(email.trim())) {
        return 'Email inválido'
    }

    return null
}

function erroSenha(senha) {
    if (typeof senha !== 'string') {
        return 'A senha é obrigatória e deve ser texto'
    }

    if (senha.length < 8) {
        return 'A senha deve ter no mínimo 8 caracteres'
    }

    // O bcrypt só considera os primeiros 72 bytes; acima disso o resto seria ignorado
    if (Buffer.byteLength(senha, 'utf8') > 72) {
        return 'A senha deve ter no máximo 72 caracteres'
    }

    if (/\s/.test(senha)) {
        return 'A senha não pode conter espaços'
    }

    return null
}

// E-mail sempre igual no banco: sem espaços nas pontas e minúsculo
function normalizarEmail(email) {
    return email.trim().toLowerCase()
}

// Aceita só inteiro positivo de verdade (1, "1"). Recusa "1abc", "1.5", "-1", objetos, etc.
// Importante: o MySQL converte "2abc" em 2, então não dá para confiar só no banco.
function idValido(valor) {
    if (typeof valor === 'number') {
        return Number.isSafeInteger(valor) && valor > 0
    }

    return typeof valor === 'string' && /^[1-9]\d{0,9}$/.test(valor)
}

module.exports = {
    erroNome,
    erroEmail,
    erroSenha,
    normalizarEmail,
    idValido
}
