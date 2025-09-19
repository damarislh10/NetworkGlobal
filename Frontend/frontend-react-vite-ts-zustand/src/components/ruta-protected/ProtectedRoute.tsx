import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/autenticacion/auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }){
  const token = useAuthStore(s => s.token)
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}
