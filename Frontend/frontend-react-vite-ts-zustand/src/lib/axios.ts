import axios from 'axios'
import { useAuthStore } from '@store/autenticacion/auth'

export const AUTH_API = process.env.VITE_AUTH_API as string
export const POSTS_API = process.env.VITE_POSTS_API as string
export const apiAuth = axios.create({ baseURL: AUTH_API })
export const apiPosts = axios.create({ baseURL: POSTS_API })

// Interceptor para agregar el token
const attach = (cfg: any) => {
  const token = useAuthStore.getState().token
  if (token) cfg.headers = { ...(cfg.headers||{}), Authorization: `Bearer ${token}` }
  return cfg
}
apiAuth.interceptors.request.use(attach)
apiPosts.interceptors.request.use(attach)
