import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-page">
      <span>404</span>
      <h1>Página não encontrada</h1>
      <p>Essa rota não existe na arena.</p>
      <Link to="/" className="btn btn-primary">Voltar ao início</Link>
    </div>
  )
}
