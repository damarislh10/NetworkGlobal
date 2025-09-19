export type User = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  alias: string
  email: string
}

export type AuthState = {
  token: string | null
  user: User | null
  setToken: (t: string | null) => void
  setUser: (u: User | null) => void
  logout: () => void
}