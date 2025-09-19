import { useState } from 'react'
import { apiAuth } from '@lib/axios'

export function useLoginHandler(email: string, password: string, setToken: (t: string) => void, setUser: (u: any) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await apiAuth.post('/auth/login', { email, password })
      setToken(data.token)
      const me = await apiAuth.get('/user/profile')
      setUser(me.data.data)
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return { handle, loading, error, setError }
}