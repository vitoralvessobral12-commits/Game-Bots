import { Link } from 'react-router-dom'

const highlights = [
  ['01', 'Cadastre-se', 'Crie seu perfil e receba seu código de identificação.'],
  ['02', 'Entre na arena', 'Enfrente outro jogador em uma batalha de robôs.'],
  ['03', 'Suba no ranking', 'Cada vitória ajuda você a conquistar posições.'],
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid" />

        <div className="hero-content">
          <span className="eyebrow">BEM-VINDO À ARENA</span>
          <h1>
            ENTRE.<br />
            <span>COMPITA.</span><br />
            VENÇA.
          </h1>
          <p>
            O palco onde estratégia e robótica se encontram.
            Cadastre-se, dispute partidas e conquiste seu lugar no ranking.
          </p>

          <div className="hero-actions">
            <Link to="/cadastro" className="btn btn-primary">Criar conta</Link>
            <Link to="/ranking" className="btn btn-secondary">Ver ranking</Link>
          </div>
        </div>

        <div className="hero-arena">
          <div className="arena-ring ring-1" />
          <div className="arena-ring ring-2" />
          <div className="robot-placeholder">
            <span>🤖</span>
            <small>ROBOT<br />ARENA</small>
          </div>
          <div className="arena-status">● ARENA ONLINE</div>
        </div>
      </section>

      <section className="section home-section">
        <div className="section-title">
          <div>
            <span className="eyebrow">COMO FUNCIONA</span>
            <h2>Pronto para lutar?</h2>
          </div>
        </div>

        <div className="steps-grid">
          {highlights.map(([number, title, text]) => (
            <article className="step-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <span className="eyebrow">SEU PRÓXIMO DESAFIO</span>
          <h2>Seu nome pode estar no topo.</h2>
          <p>Crie sua conta e comece a construir sua história na Robot Arena.</p>
        </div>
        <Link to="/cadastro" className="btn btn-primary">Começar agora</Link>
      </section>
    </>
  )
}
