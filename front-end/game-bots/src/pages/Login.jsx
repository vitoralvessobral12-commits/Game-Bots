import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, saveSession } from '../services/api'

export default function Login() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        senha: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        setError('')
        setLoading(true)

        try {
            const data = await api.loginCliente(form)

            const token = data?.token || data?.cliente?.token

            if (!token) {
                throw new Error('O servidor não retornou o token.')
            }

            const user = data.cliente || data.dados || {}

            saveSession({
                token,
                user: {
                    ...user,
                    tipo: 'cliente',
                },
            })

            navigate('/perfil')
        } catch (err) {
            setError(
                err?.message || 'Não foi possível realizar o login.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-decoration">
                <span>ROBOT</span>
                <strong>ARENA</strong>
                <p>Entre na sua conta e acompanhe sua jornada.</p>
            </div>

            <div className="form-card">
                <span className="eyebrow">ÁREA DO JOGADOR</span>

                <h1>Entrar</h1>

                <p className="form-description">
                    Acesse sua conta e acompanhe sua evolução.
                </p>

                <form onSubmit={handleSubmit}>
                    <label>
                        E-mail

                        <input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    email: event.target.value,
                                })
                            }
                            placeholder="seu@email.com"
                            required
                        />
                    </label>

                    <label>
                        Senha

                        <input
                            type="password"
                            value={form.senha}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    senha: event.target.value,
                                })
                            }
                            placeholder="••••••••"
                            required
                        />
                    </label>

                    {error && (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    )}

                    <button
                        className="btn btn-primary btn-full"
                        disabled={loading}
                    >
                        {loading
                            ? 'Entrando...'
                            : 'Entrar na arena'}
                    </button>
                </form>

                <p className="form-footer">
                    Ainda não tem uma conta?{' '}
                    <Link to="/cadastro">Cadastre-se</Link>
                </p>

                <p className="form-footer">
                    <Link to="/atendente/login">
                        Acesso do atendente
                    </Link>
                </p>
            </div>
        </section>
    )
}
