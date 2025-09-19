import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@store/autenticacion/auth'

export default function Navbar(){
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <header className="nav">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
        <Link to="/" className="font-bold text-xl text-white">Network<span className="text-brand-400">Social</span></Link>
        {user && (
          <nav className="flex items-center gap-2">
            <NavLink to="/" className="btn btn-outline">Feed</NavLink>
            <NavLink to="/create" className="btn">Crear</NavLink>
            <NavLink to="/profile" className="btn btn-outline">Perfil</NavLink>
            <button onClick={handleLogout} className="btn">Salir</button>
          </nav>
        )}
      </div>
    </header>
  )
}
