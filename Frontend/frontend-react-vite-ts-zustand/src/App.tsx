import { Outlet } from 'react-router-dom'
import Navbar from '@components/navegacion/Navbar'
import { useHydrateUser } from 'hooks/useHydrateUser.tsx'

export default function App() {
  useHydrateUser()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}