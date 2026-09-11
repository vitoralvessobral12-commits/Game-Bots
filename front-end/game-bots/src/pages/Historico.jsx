import PageHeader from '../components/PageHeader'

const matches = [
  ['Vitória', 'João Silva', 'Jonas Costa', 'Titã', '08/09/2026', true],
  ['Derrota', 'João Silva', 'Pedro Lima', 'Titã', '07/09/2026', false],
  ['Vitória', 'Marcos Santos', 'Ana Oliveira', 'Titã', '06/09/2026', true],
  ['Vitória', 'Lucas Almeida', 'Jonas Costa', 'Titã', '05/09/2026', true],
]

export default function Historico() {
  return (
    <div className="container page-space">
      <PageHeader
        eyebrow="PARTIDAS"
        title="Histórico"
        description="Acompanhe os resultados das partidas da arena."
      />

      <section className="card match-history">
        <div className="history-head">
          <span>Resultado</span><span>Jogadores</span><span>Robô</span><span>Data</span>
        </div>

        {matches.map((match, index) => (
          <div className="history-row" key={index}>
            <span className={match[5] ? 'badge badge-win' : 'badge badge-loss'}>{match[0]}</span>
            <div><strong>{match[1]}</strong><span>vs</span><strong>{match[2]}</strong></div>
            <span>{match[3]}</span>
            <span>{match[4]}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
