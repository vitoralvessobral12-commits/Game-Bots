import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../services/api'

export default function Navbar() {
  const navigate = useNavigate()
  const session = getSession()
  const isAtendente = session?.user?.tipo === 'atendente'

  function logout() {
    clearSession()
    navigate('/')
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">RA</span>
        <span><strong>ROBOT</strong><small>ARENA</small></span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
        <NavLink to="/historico">Partidas</NavLink>
        {session && !isAtendente && <NavLink to="/perfil">Perfil</NavLink>}
        {isAtendente ? (
          <NavLink to="/atendente">Painel</NavLink>
        ) : (
          <NavLink to="/login" className="nav-login">Entrar</NavLink>
        )}
        {session && <button className="nav-logout" onClick={logout}>Sair</button>}
      </nav>
    </header>
  )
}
