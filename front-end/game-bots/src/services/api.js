const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4001').replace(/\/$/, '')

async function request(path, options = {}) {
    const { token, headers: customHeaders, ...fetchOptions } = options
    const authToken = token || localStorage.getItem('robotArenaToken')
    const headers = { Accept: 'application/json', ...(fetchOptions.body ? { 'Content-Type': 'application/json' } : {}), ...(customHeaders || {}) }
    if (authToken) headers.Authorization = `Bearer ${authToken}`
    let response
    try {
        response = await fetch(`${API_URL}${path}`, { ...fetchOptions, headers })
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Tente novamente em instantes.')
    }
    const text = await response.text()
    let data = {}
    if (text) { try { data = JSON.parse(text) } catch { data = { mensagem: text } } }
    // Token expirado/inválido ou conta desativada: derruba a sessão local
    if (response.status === 401 && authToken) clearSession()
    if (!response.ok) throw new Error(data.error || data.mensagem || `Erro ${response.status} ao comunicar com o servidor.`)
    return data
}

export const api = {
    loginCliente: (body) => request('/clientes/login', { method: 'POST', body: JSON.stringify(body) }),
    cadastrarCliente: (body) => request('/clientes', { method: 'POST', body: JSON.stringify(body) }),
    perfilCliente: (token) => request('/clientes/perfil', { token }),
    partidasDoCliente: (token) => request('/clientes/perfil/partidas', { token }),
    buscarClientePorCodigo: (codigo, token) => request(`/clientes/codigo/${encodeURIComponent(codigo)}`, { token }),
    loginAtendente: (body) => request('/atendentes/login', { method: 'POST', body: JSON.stringify(body) }),
    listarPartidas: () => request('/partidas'),
    listarClientes: (token) => request('/clientes', { token }),
    buscarPartida: (id) => request(`/partidas/${id}`),
    listarRanking: () => request('/ranking'),
    criarPartida: (body, token) => request('/partidas', { method: 'POST', body: JSON.stringify(body), token }),
    listarRobos: () => request('/robos')
}

export function saveSession({ token, user = {}, tipo } = {}) {
    if (!token) throw new Error('Não foi possível salvar a sessão: token ausente.')
    const normalizedUser = { ...user, ...(tipo ? { tipo } : {}) }
    localStorage.setItem('robotArenaToken', token)
    localStorage.setItem('robotArenaUser', JSON.stringify(normalizedUser))
}

export function clearSession() {
    localStorage.removeItem('robotArenaToken')
    localStorage.removeItem('robotArenaUser')
}

// Lê a validade (exp) do JWT. Não confere assinatura (isso é papel do back-end),
// serve só para não mostrar telas protegidas com um token já vencido.
function tokenExpirado(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
        return !payload.exp || payload.exp * 1000 <= Date.now()
    } catch {
        return true
    }
}

export function getSession() {
    const token = localStorage.getItem('robotArenaToken')
    if (!token) return null
    if (tokenExpirado(token)) { clearSession(); return null }
    let user = {}
    try { user = JSON.parse(localStorage.getItem('robotArenaUser') || '{}') } catch { clearSession(); return null }
    return { token, user }
}
