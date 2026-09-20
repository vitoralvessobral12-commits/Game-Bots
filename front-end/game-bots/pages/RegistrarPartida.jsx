import { Link } from 'react-router-dom'

export default function RegistrarPartida() {
  function handleSubmit(event) {
    event.preventDefault()
    // Depois: chamar POST /partidas na API.
  }

  return (
    <div className="container narrow page-space">
      <Link to="/atendente" className="back-link">← Voltar ao painel</Link>

      <div className="form-card wide">
        <span className="eyebrow">NOVA PARTIDA</span>
        <h1>Registrar resultado</h1>
        <p className="form-description">Informe os dados da batalha realizada.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Cliente 1
              <select required defaultValue="">
                <option value="" disabled>Selecione o jogador</option>
                <option>João Silva</option>
                <option>Jonas Costa</option>
                <option>Pedro Lima</option>
              </select>
            </label>

            <label>
              Cliente 2
              <select required defaultValue="">
                <option value="" disabled>Selecione o jogador</option>
                <option>João Silva</option>
                <option>Jonas Costa</option>
                <option>Pedro Lima</option>
              </select>
            </label>

            <label>
              Robô
              <select required defaultValue="">
                <option value="" disabled>Selecione o robô</option>
                <option>Titã</option>
                <option>Fênix</option>
              </select>
            </label>

            <label>
              Vencedor
              <select required defaultValue="">
                <option value="" disabled>Selecione o vencedor</option>
                <option>Cliente 1</option>
                <option>Cliente 2</option>
              </select>
            </label>
          </div>

          <button className="btn btn-primary btn-full" type="submit">Registrar partida</button>
        </form>
      </div>
    </div>
  )
}
