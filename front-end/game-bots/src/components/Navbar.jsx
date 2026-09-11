import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">RA</span>
        <span>
          <strong>ROBOT</strong>
          <small>ARENA</small>
        </span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
        <NavLink to="/historico">Partidas</NavLink>
        <NavLink to="/login" className="nav-login">Entrar</NavLink>
      </nav>
    </header>
  )
}
