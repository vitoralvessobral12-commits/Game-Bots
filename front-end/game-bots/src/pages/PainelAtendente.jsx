import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'

export default function PainelAtendente() {
  return (
    <div className="container page-space">
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">PAINEL INTERNO</span>
          <h1>Olá, atendente.</h1>
          <p>Gerencie as partidas da Robot Arena.</p>
        </div>
        <Link to="/atendente/partida" className="btn btn-primary">+ Registrar partida</Link>
      </div>

      <div className="stats-grid">
        <StatCard icon="⚔" value="24" label="Partidas hoje" />
        <StatCard icon="👥" value="48" label="Jogadores ativos" />
        <StatCard icon="🤖" value="6" label="Robôs disponíveis" />
      </div>

      <section className="card">
        <div className="section-title">
          <h2>Atalhos</h2>
        </div>
        <div className="shortcut-grid">
          <Link to="/atendente/partida" className="shortcut-card"><span>⚔</span><strong>Registrar partida</strong><small>Adicionar resultado</small></Link>
          <Link to="/ranking" className="shortcut-card"><span>🏆</span><strong>Ver ranking</strong><small>Acompanhar jogadores</small></Link>
          <Link to="/historico" className="shortcut-card"><span>📋</span><strong>Histórico</strong><small>Consultar partidas</small></Link>
        </div>
      </section>
    </div>
  )
}
