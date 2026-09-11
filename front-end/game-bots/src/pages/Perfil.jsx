import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import SectionTitle from '../components/SectionTitle'

export default function Perfil() {
  return (
    <div className="container page-space">
      <div className="profile-header card">
        <div className="avatar">J</div>
        <div>
          <span className="eyebrow">JOGADOR</span>
          <h1>João Silva</h1>
          <p>Código: <strong>CLI001</strong></p>
        </div>
        <Link to="/historico" className="btn btn-secondary">Ver partidas</Link>
      </div>

      <div className="stats-grid">
        <StatCard icon="🏆" value="12" label="Vitórias" />
        <StatCard icon="⚔" value="5" label="Derrotas" />
        <StatCard icon="📊" value="71%" label="Aproveitamento" />
        <StatCard icon="#1" value="8º" label="Posição" />
      </div>

      <section className="card">
        <SectionTitle title="Últimas partidas" action={<Link to="/historico" className="text-link">Ver todas</Link>} />
        <div className="match-list">
          <div className="match-row">
            <span className="result win">V</span>
            <div><strong>João Silva × Jonas Costa</strong><small>Robô: Titã · Hoje</small></div>
            <b>Vitória</b>
          </div>
          <div className="match-row">
            <span className="result loss">D</span>
            <div><strong>João Silva × Pedro Lima</strong><small>Robô: Titã · Ontem</small></div>
            <b>Derrota</b>
          </div>
        </div>
      </section>
    </div>
  )
}
