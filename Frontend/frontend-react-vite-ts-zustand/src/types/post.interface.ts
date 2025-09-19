import type { Post } from '@models/Publicacion'

export interface PostsState {
  items: Post[]
  loading: boolean
  fetch: () => Promise<void>
  create: (message: string) => Promise<void>
  toggleLike: (id: string) => Promise<void>
  bindRealtime: () => void
}