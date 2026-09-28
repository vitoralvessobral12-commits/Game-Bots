import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setMessage(''); setLoading(true)
    try {
      const data = await api.cadastrarCliente(form)
      const codigo = data.cliente?.codigo_identificacao || data.dados?.codigo_identificacao
      setMessage(codigo ? `Cadastro realizado. Seu código é ${codigo}.` : 'Cadastro realizado com sucesso.')
      setTimeout(() => navigate('/login'), 1400)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  return <section className="auth-page">
    <div className="auth-decoration"><span>PREPARE-SE</span><strong>PARA A ARENA</strong><p>Seu código de identificação é criado automaticamente no cadastro.</p></div>
    <div className="form-card">
      <span className="eyebrow">NOVO JOGADOR</span><h1>Criar conta</h1>
      <p className="form-description">Entre para a competição e crie seu perfil.</p>
      <form onSubmit={handleSubmit}>
        <label>Nome<input value={form.nome} onChange={e => setForm({...form, nome:e.target.value})} placeholder="Seu nome" required /></label>
        <label>E-mail<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="seu@email.com" required /></label>
        <label>Senha<input type="password" value={form.senha} onChange={e => setForm({...form, senha:e.target.value})} placeholder="Crie uma senha" required /></label>
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <button className="btn btn-primary btn-full" disabled={loading}>{loading ? 'Criando...' : 'Criar jogador'}</button>
      </form>
      <p className="form-footer">Já possui uma conta? <Link to="/login">Entrar</Link></p>
    </div>
  </section>
}
