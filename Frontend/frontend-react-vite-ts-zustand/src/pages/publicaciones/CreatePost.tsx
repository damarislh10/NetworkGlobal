import { useState } from 'react'
import Layout from '@components/layout/Layout'
import { usePostsStore } from '@store/publicaciones/posts'
import { useNavigate } from 'react-router-dom'

export default function CreatePost(){
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { create } = usePostsStore()
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!message.trim()) { setError('Escribe algo…'); return }
    setLoading(true)
    try {
      await create(message)
      navigate('/')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'No se pudo crear')
    } finally { setLoading(false) }
  }

  return (
    <div className="mx-auto max-w-2xl mt-6">
      <Layout>
        <h1 className="text-2xl font-semibold mb-4">Crear publicación</h1>
        <form onSubmit={handle} className="space-y-4">
          <div>
            <textarea className="input min-h-[120px]" value={message} onChange={e=>setMessage(e.target.value)} placeholder="¿Qué estás pensando?" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button className="btn" disabled={loading}>{loading ? 'Publicando…' : 'Publicar'}</button>
        </form>
      </Layout>
    </div>
  )
}
