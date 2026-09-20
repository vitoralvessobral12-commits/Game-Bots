import { Link } from 'react-router-dom'

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault()
    // Depois: chamar a API de login.
  }

  return (
    <section className="auth-page">
      <div className="auth-decoration">
        <span>ROBOT</span>
        <strong>ARENA</strong>
      </div>

      <div className="form-card">
        <span className="eyebrow">ÁREA DO JOGADOR</span>
        <h1>Entrar</h1>
        <p className="form-description">Acesse sua conta e acompanhe sua evolução.</p>

        <form onSubmit={handleSubmit}>
          <label>
            E-mail
            <input type="email" placeholder="seu@email.com" required />
          </label>

          <label>
            Senha
            <input type="password" placeholder="••••••••" required />
          </label>

          <button className="btn btn-primary btn-full" type="submit">Entrar na arena</button>
        </form>

        <p className="form-footer">
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  )
}
