import { useEffect } from 'react'
import { usePostsStore } from '@store/publicaciones/posts';
import Layout from '@components/layout/Layout'
import Spinner from '@components/loader/Spinner'
import PostCard from '@components/lista-post/PostCard'

export default function Posts(){
  const { items, fetch, loading, bindRealtime } = usePostsStore()

  useEffect(() => { fetch(); bindRealtime() }, [])

  return (
    <div className="mx-auto max-w-2xl mt-6">
      <Layout>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Publicaciones</h1>
        </div>
        {loading ? <Spinner/> : (
          items.length === 0 ? (
            <p className="text-slate-400">No hay publicaciones todavía. ¡Sigue a alguien o crea una nueva!</p>
          ) : (
            items.map(p => <PostCard key={p.id} post={p} />)
          )
        )}
      </Layout>
    </div>
  )
}
