import { Post } from '@models/Publicacion'
import { usePostsStore } from '@store/publicaciones/posts'

export default function PostCard({ post }: { post: Post }){
  const toggleLike = usePostsStore(s => s.toggleLike)
  const d = new Date(post.createdAt)
  const when = d.toLocaleString()

  return (
    <article className="card p-4 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-200 text-lg">{post.message}</p>
          <p className="text-slate-400 text-sm mt-1">{when}</p>
        </div>
        <button onClick={() => toggleLike(post.id)} className={`btn ${post.likedByMe ? '' : 'btn-outline'}`}>
          ❤ {post.likes}
        </button>
      </div>
    </article>
  )
}
