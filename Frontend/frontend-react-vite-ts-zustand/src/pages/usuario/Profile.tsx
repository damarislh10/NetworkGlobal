import Layout from '@components/layout/Layout'
import { useAuthStore } from '@store/autenticacion/auth'

export default function Profile(){
  const { user } = useAuthStore()
  if (!user) return null

  return (
    <div className="mx-auto max-w-2xl mt-6">
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Perfil</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <p className="text-slate-400">Nombre</p>
            <p className="text-lg">{user.firstName} {user.lastName}</p>
          </div>
          <div className="card p-4">
            <p className="text-slate-400">Alias</p>
            <p className="text-lg">{user.alias}</p>
          </div>
          <div className="card p-4">
            <p className="text-slate-400">Email</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <div className="card p-4">
            <p className="text-slate-400">Nacimiento</p>
            <p className="text-lg">{new Date(user.birthDate).toLocaleDateString()}</p>
          </div>
        </div>
      </Layout>
    </div>
  )
}
