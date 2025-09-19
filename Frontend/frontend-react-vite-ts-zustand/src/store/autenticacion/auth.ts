import { AuthState } from 'types/auth.interface'
import { create } from 'zustand'



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
