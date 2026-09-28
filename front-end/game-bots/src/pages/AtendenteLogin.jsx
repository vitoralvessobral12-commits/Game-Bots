import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api, saveSession } from '../services/api'

export default function AtendenteLogin() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', senha: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function submit(event) {
        event.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await api.loginAtendente(form)

const token = data?.token || data?.atendente?.token

if (!token) {
    throw new Error('O servidor não retornou o token de autenticação.')
}

const user = data.atendente || data.dados?.atendente || data.dados || {}

saveSession({ token, user, tipo: 'atendente' })
            navigate('/atendente', { replace: true })
        } catch (err) {
            setError(err?.message || 'Não foi possível realizar o login do atendente.')
        } finally { setLoading(false) }
    }

    return <section className="auth-page">
        <div className="auth-decoration"><span>OPERAÇÃO</span><strong>DA ARENA</strong><p>Acesso exclusivo para o atendimento e registro das partidas.</p></div>
        <div className="form-card"><span className="eyebrow">ÁREA DO ATENDENTE</span><h1>Entrar</h1><p className="form-description">Acesse o painel operacional da Robot Arena.</p>
            <form onSubmit={submit}>
                <label>E-mail<input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="username" required /></label>
                <label>Senha<input name="senha" type="password" value={form.senha} onChange={handleChange} autoComplete="current-password" required /></label>
                {error && <div className="alert alert-error">{error}</div>}
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>{loading ? 'Entrando...' : 'Entrar no painel'}</button>
            </form>
            <p className="form-footer"><Link to="/login">Voltar ao login do jogador</Link></p>
        </div>
    </section>
}
