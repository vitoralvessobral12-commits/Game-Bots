import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api, getSession } from '../services/api'

export default function RegistrarPartida() {
  const navigate = useNavigate()
  const session = getSession()
  const token = session?.token
  const [clients, setClients] = useState([])
  const [robots, setRobots] = useState([])
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [robot, setRobot] = useState('')
  const [winner, setWinner] = useState('')
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    Promise.all([api.listarClientes(token), api.listarRobos()])
      .then(([clientsData, robotsData]) => {
        setClients(clientsData.clientes || clientsData.dados || [])
        setRobots(robotsData.robos || robotsData.dados || [])
      })
      .catch((err) => setError(`Não foi possível carregar os dados da partida: ${err.message}`))
      .finally(() => setPageLoading(false))
  }, [token])

  const activeClients = useMemo(() => clients.filter((client) => client.ativo !== false), [clients])

  function findByCode(code) {
    return activeClients.find((client) => client.codigo_identificacao?.toUpperCase() === code.trim().toUpperCase())
  }

  function identifyPlayer(number) {
    setError(''); setMessage('')
    const code = number === 1 ? code1 : code2
    const found = findByCode(code)
    if (!found) return setError(`Nenhum cliente ativo foi encontrado para o código ${code || 'informado'}.`)
    if (number === 2 && player1?.id === found.id) return setError('Os dois jogadores precisam ser diferentes.')
    number === 1 ? setPlayer1(found) : setPlayer2(found)
    setWinner('')
  }

  async function submit(event) {
    event.preventDefault(); setError(''); setMessage('')
    if (!player1 || !player2 || !robot || !winner) return setError('Preencha todos os campos da partida.')
    setLoading(true)
    try {
      await api.criarPartida({ cliente1_id: player1.id, cliente2_id: player2.id, robo_id: Number(robot), vencedor_id: Number(winner), atendente_id: session?.user?.id }, token)
      setMessage('Partida registrada com sucesso!')
      setTimeout(() => navigate('/atendente'), 900)
    } catch (err) { setError(err.message) } finally { setLoading(false) }
  }

  if (pageLoading) return <div className="container narrow page-space"><div className="card loading-state">Preparando registro da partida...</div></div>

  return <div className="container narrow page-space">
    <Link to="/atendente" className="back-link">← Voltar ao painel</Link>
    <div className="form-card wide">
      <span className="eyebrow">NOVA PARTIDA</span><h1>Registrar resultado</h1>
      <p className="form-description">Digite apenas os códigos dos jogadores. O restante é selecionado pelo atendente.</p>
      <div className="code-grid">
        <div className={`code-field ${player1 ? 'found' : ''}`}><label>Código do jogador 1<input value={code1} onChange={(e) => { setCode1(e.target.value.toUpperCase()); setPlayer1(null) }} placeholder="CLI00001" /></label><button type="button" className="btn btn-secondary" onClick={() => identifyPlayer(1)}>Buscar</button>{player1 && <div className="player-found"><span>✓ ENCONTRADO</span><strong>{player1.nome}</strong><small>{player1.codigo_identificacao}</small></div>}</div>
        <div className={`code-field ${player2 ? 'found' : ''}`}><label>Código do jogador 2<input value={code2} onChange={(e) => { setCode2(e.target.value.toUpperCase()); setPlayer2(null) }} placeholder="CLI00002" /></label><button type="button" className="btn btn-secondary" onClick={() => identifyPlayer(2)}>Buscar</button>{player2 && <div className="player-found"><span>✓ ENCONTRADO</span><strong>{player2.nome}</strong><small>{player2.codigo_identificacao}</small></div>}</div>
      </div>
      <form onSubmit={submit}><div className="form-grid"><label>Robô<select value={robot} onChange={(e) => setRobot(e.target.value)} required><option value="">Selecione o robô</option>{robots.filter(r => r.ativo !== false).map(r => <option key={r.id} value={r.id}>{r.nome}</option>)}</select></label><label>Vencedor<select value={winner} onChange={(e) => setWinner(e.target.value)} disabled={!player1 || !player2} required><option value="">Selecione o vencedor</option>{player1 && <option value={player1.id}>{player1.nome}</option>}{player2 && <option value={player2.id}>{player2.nome}</option>}</select></label></div>{error && <div className="alert alert-error">{error}</div>}{message && <div className="alert alert-success">{message}</div>}<button className="btn btn-primary btn-full" disabled={loading || !player1 || !player2}>{loading ? 'Registrando...' : 'Registrar partida'}</button></form>
    </div>
  </div>
}
