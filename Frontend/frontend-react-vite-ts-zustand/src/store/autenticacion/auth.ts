import { create } from 'zustand'

type User = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  alias: string
  email: string
}

type AuthState = {
  token: string | null
  user: User | null
  setToken: (t: string | null) => void
  setUser: (u: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null,
  user: null,
  setToken: (t) => {
    if (typeof localStorage !== 'undefined') {
      if (t) localStorage.setItem('token', t)
      else localStorage.removeItem('token')
    }
    set({ token: t })
  },
  setUser: (u) => set({ user: u }),
  logout: () => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem('token')
    set({ token: null, user: null })
  }
}))
