import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
const { apiAuth } = require('@lib/axios')


// Mocks
jest.mock('@store/autenticacion/auth', () => ({
    useAuthStore: () => ({
        token: null,
        setToken: jest.fn(),
        setUser: jest.fn(),
    }),
}))
jest.mock('@lib/axios', () => ({
    apiAuth: {
        post: jest.fn(),
        get: jest.fn(),
    },
}))
jest.mock('@components/layout/Layout', () => ({ children }: any) => <div>{children}</div>)

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}))

describe('Login', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })



    it('updates email and password fields', () => {
        render(<Login />, { wrapper: MemoryRouter })
        const emailInput = screen.getByPlaceholderText('ana@test.com')
        const passwordInput = screen.getByPlaceholderText('••••••')
        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } })
        fireEvent.change(passwordInput, { target: { value: '123456' } })
        expect(emailInput).toHaveValue('test@mail.com')
        expect(passwordInput).toHaveValue('123456')
    })

    it('shows loading state when submitting', async () => {
        apiAuth.post.mockResolvedValueOnce({ data: { token: 'token123' } })
        apiAuth.get.mockResolvedValueOnce({ data: { data: { name: 'Ana' } } })
        render(<Login />, { wrapper: MemoryRouter })
        fireEvent.change(screen.getByPlaceholderText('ana@test.com'), { target: { value: 'ana@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'password' } })
        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))
        expect(screen.getByRole('button')).toHaveTextContent(/Ingresando/i)
        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'))
    })

    it('shows error message on failed login', async () => {
        apiAuth.post.mockRejectedValueOnce({ response: { data: { message: 'Credenciales inválidas' } } })
        render(<Login />, { wrapper: MemoryRouter })
        fireEvent.change(screen.getByPlaceholderText('ana@test.com'), { target: { value: 'ana@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'wrongpass' } })
        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))
        await waitFor(() => expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument())
    })

    it('shows default error message if error has no response', async () => {
        apiAuth.post.mockRejectedValueOnce({})
        render(<Login />, { wrapper: MemoryRouter })
        fireEvent.change(screen.getByPlaceholderText('ana@test.com'), { target: { value: 'ana@test.com' } })
        fireEvent.change(screen.getByPlaceholderText('••••••'), { target: { value: 'wrongpass' } })
        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))
        await waitFor(() => expect(screen.getByText(/Error al iniciar sesión/i)).toBeInTheDocument())
    })
})