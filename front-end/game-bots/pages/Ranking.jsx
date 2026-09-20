import PageHeader from '../components/PageHeader'

const players = [
  ['01', 'Lucas Almeida', '18', '4', '90%'],
  ['02', 'Marcos Santos', '16', '5', '76%'],
  ['03', 'Ana Oliveira', '15', '6', '71%'],
  ['04', 'João Silva', '12', '5', '71%'],
  ['05', 'Jonas Costa', '10', '8', '56%'],
  ['06', 'Pedro Lima', '8', '9', '47%'],
]

export default function Ranking() {
  return (
    <div className="container page-space">
      <PageHeader
        eyebrow="COMPETIÇÃO"
        title="Ranking"
        description="Veja quem está dominando a Robot Arena."
      />

      <div className="podium">
        <div className="podium-place second"><span>02</span><strong>Marcos</strong><small>16 vitórias</small></div>
        <div className="podium-place first"><span>01</span><strong>Lucas</strong><small>18 vitórias</small></div>
        <div className="podium-place third"><span>03</span><strong>Ana</strong><small>15 vitórias</small></div>
      </div>

      <section className="ranking-table card">
        <div className="table-head">
          <span>#</span><span>Jogador</span><span>Vitórias</span><span>Derrotas</span><span>Aproveitamento</span>
        </div>
        {players.map(player => (
          <div className="table-row" key={player[0]}>
            <span className="rank-number">{player[0]}</span>
            <strong>{player[1]}</strong>
            <span>{player[2]}</span>
            <span>{player[3]}</span>
            <span className="win-rate">{player[4]}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
