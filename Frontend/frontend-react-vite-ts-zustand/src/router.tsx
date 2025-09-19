import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from '@pages/usuario/Login'
import Profile from '@pages/usuario/Profile'
import Posts from '@pages/publicaciones/Posts'
import CreatePost from '@pages/publicaciones/CreatePost'
import ProtectedRoute from '@components/ruta-protected/ProtectedRoute'

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/', element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { index: true, element: <Posts /> },
      { path: 'profile', element: <Profile /> },
      { path: 'create', element: <CreatePost /> },
    ]
  },
])

export default router
