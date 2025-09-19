import { useEffect, useRef } from 'react'
import { apiAuth } from '../lib/axios'
import { useAuthStore } from '@store/autenticacion/auth'

export function useHydrateUser() {
  const { token, user, setUser, logout } = useAuthStore()
  const didHydrate = useRef(false)

  useEffect(() => {
    if (!token || user || didHydrate.current) return
    didHydrate.current = true

    ;(async () => {
      try {
        const me = await apiAuth.get('/user/profile')
        setUser(me.data.data)
      } catch {
        logout()
      }
    })()
  }, [token, user, setUser, logout])
  }