import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '@store/autenticacion/auth'
import { apiAuth } from '@lib/axios'
import { useNavigate } from 'react-router-dom'
import Layout from '@components/layout/Layout'

export default function Login(){
  const { token, setToken, setUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const didRedirect = useRef(false) // evita doble navegación en StrictMode

  useEffect(() => {
    if (!token || didRedirect.current) return
    didRedirect.current = true
    navigate('/')
  }, [token, navigate])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await apiAuth.post('/auth/login', { email, password })
      setToken(data.token)
      const me = await apiAuth.get('/user/profile')
      setUser(me.data.data)
      // 👇 ya NO navegamos aquí; lo hará el effect cuando vea token
      // navigate('/')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error al iniciar sesión')
    } finally { setLoading(false) }
  }
  return (
    <div className="mx-auto max-w-md mt-16">
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Bienvenido a NetworkGlobal</h1>
        <p className="text-slate-400 mb-6">Inicia sesión para continuar</p>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ana@test.com" required />
          </div>
          <div>
            <label className="label">Contraseña</label>
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••" required />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="btn w-full" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</button>
        </form>
      </Layout>
    </div>
  )
}
