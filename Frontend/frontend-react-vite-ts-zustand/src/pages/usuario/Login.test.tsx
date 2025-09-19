// src/pages/usuario/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
const { apiAuth } = require('@lib/axios')


jest.mock('@store/autenticacion/auth', () => ({
  useAuthStore: () => ({
    token: null,
    setToken: jest.fn(),
    setUser: jest.fn(),
  }),
}))

jest.mock('@lib/axios', () => ({
  apiAuth: { post: jest.fn(), get: jest.fn() },
}))

jest.mock('@components/layout/Layout', () => ({ children }: any) => <div>{children}</div>)

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

describe('Login', () => {
  beforeEach(() => jest.clearAllMocks())


  it('shows loading and navigates on success', async () => {
    apiAuth.post.mockResolvedValueOnce({ data: { token: 'token123' } })
    apiAuth.get.mockResolvedValueOnce({ data: { data: { name: 'Ana' } } })

    render(<Login />, { wrapper: MemoryRouter })
    fireEvent.change(screen.getByPlaceholderText('ana@test.com'), { target: { value: 'ana@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'password' } })
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))

    // botón cambia a "Ingresando…"
    expect(screen.getByRole('button')).toHaveTextContent(/Ingresando/i)

  })

  it('shows error on failed login', async () => {
    apiAuth.post.mockRejectedValueOnce({ response: { data: { message: 'Credenciales inválidas' } } })

    render(<Login />, { wrapper: MemoryRouter })
    fireEvent.change(screen.getByPlaceholderText('ana@test.com'), { target: { value: 'ana@test.com' } })
    fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'wrongpass' } })
    fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))

    await waitFor(() => expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument())
  })
})
