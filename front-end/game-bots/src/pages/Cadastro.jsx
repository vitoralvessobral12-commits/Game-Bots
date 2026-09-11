import { Link } from 'react-router-dom'

export default function Cadastro() {
  function handleSubmit(event) {
    event.preventDefault()
    // Depois: chamar POST /clientes na API.
  }

  return (
    <section className="auth-page">
      <div className="auth-decoration">
        <span>PREPARE-SE</span>
        <strong>PARA A ARENA</strong>
      </div>

      <div className="form-card">
        <span className="eyebrow">NOVO JOGADOR</span>
        <h1>Criar conta</h1>
        <p className="form-description">Entre para a competição e crie seu perfil.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" placeholder="Seu nome" required />
          </label>

          <label>
            E-mail
            <input type="email" placeholder="seu@email.com" required />
          </label>

          <label>
            Senha
            <input type="password" placeholder="Crie uma senha" required />
          </label>

          <label>
            Código de identificação
            <input type="text" placeholder="Ex.: CLI001" required />
          </label>

          <button className="btn btn-primary btn-full" type="submit">Criar jogador</button>
        </form>

        <p className="form-footer">
          Já possui uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  )
}
