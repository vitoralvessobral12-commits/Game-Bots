import { Navigate, Outlet } from 'react-router-dom'
import { getSession } from '../services/api'

export default function ProtectedRoute({ role }) {
    const session = getSession()
    if (!session?.token) return <Navigate to={role === 'atendente' ? '/atendente/login' : '/login'} replace />
    if (role && session.user?.tipo && session.user.tipo !== role) {
        return <Navigate to={role === 'atendente' ? '/atendente/login' : '/login'} replace />
    }
    return <Outlet />
}
