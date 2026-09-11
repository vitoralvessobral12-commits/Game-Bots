import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Ranking from './pages/Ranking'
import Historico from './pages/Historico'
import PainelAtendente from './pages/PainelAtendente'
import RegistrarPartida from './pages/RegistrarPartida'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/atendente" element={<PainelAtendente />} />
          <Route path="/atendente/partida" element={<RegistrarPartida />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
