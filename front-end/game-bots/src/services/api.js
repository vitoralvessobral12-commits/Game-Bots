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
        throw new Error(`Não foi possível conectar ao servidor em ${API_URL}. Verifique se o backend está ligado na porta 4001.`)
    }
    const text = await response.text()
    let data = {}
    if (text) { try { data = JSON.parse(text) } catch { data = { mensagem: text } } }
    if (!response.ok) throw new Error(data.error || data.mensagem || `Erro ${response.status} ao comunicar com o servidor.`)
    return data
}

export const api = {
    loginCliente: (body) => request('/clientes/login', { method: 'POST', body: JSON.stringify(body) }),
    cadastrarCliente: (body) => request('/clientes', { method: 'POST', body: JSON.stringify(body) }),
    perfilCliente: (token) => request('/clientes/perfil', { token }),
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

export function getSession() {
    const token = localStorage.getItem('robotArenaToken')
    if (!token) return null
    let user = {}
    try { user = JSON.parse(localStorage.getItem('robotArenaUser') || '{}') } catch { clearSession(); return null }
    return { token, user }
}
