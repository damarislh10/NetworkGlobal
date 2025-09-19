import { io, Socket } from 'socket.io-client'
import { POSTS_API } from './axios'

let socket: Socket | null = null

export function getSocket() {
  if (!socket) {
    socket = io(POSTS_API, { transports: ['websocket'] })
  }
  return socket
}
