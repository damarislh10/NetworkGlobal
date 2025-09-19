import { create } from 'zustand'
import { apiPosts } from '@lib/axios'
import { getSocket } from '@lib/socket'
import type { Post } from '@models/Publicacion'

interface PostsState {
  items: Post[]
  loading: boolean
  fetch: () => Promise<void>
  create: (message: string) => Promise<void>
  toggleLike: (id: string) => Promise<void>
  bindRealtime: () => void
}

export const usePostsStore = create<PostsState>((set, get) => ({
  items: [],
  loading: false,

  fetch: async () => {
    set({ loading: true })
    try {
      const { data } = await apiPosts.get('/posts')
      set({ items: data.data, loading: false })
    } catch (e) {
      set({ loading: false })
    }
  },

  create: async (message: string) => {
    const { data } = await apiPosts.post('/posts', { message })
    const created = data.data
    set({ items: [created, ...get().items] })
  },

  toggleLike: async (id: string) => {
    const { data } = await apiPosts.post(`/posts/${id}/like`)
    const likes = data.data.likes as number
    set({ items: get().items.map(p => p.id === id ? { ...p, likes, likedByMe: !p.likedByMe } : p) })
  },

  bindRealtime: () => {
    const s = getSocket()
    s.off('post:like')
    s.on('post:like', ({ postId, likes }) => {
      set({ items: get().items.map(p => p.id === postId ? { ...p, likes } : p) })
    })
  }
}))
