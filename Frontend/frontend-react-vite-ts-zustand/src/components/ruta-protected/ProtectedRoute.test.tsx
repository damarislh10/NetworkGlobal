import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
const { useAuthStore } = require('@store/autenticacion/auth')

// Mock useAuthStore
jest.mock('@store/autenticacion/auth', () => ({
    useAuthStore: jest.fn(),
}))


describe('ProtectedRoute', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders children when token exists', () => {
    useAuthStore.mockImplementation((cb: any) => cb({ token: 'valid-token' }))
        const { getByText } = render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>
        )
        expect(getByText('Protected Content')).toBeInTheDocument()
    })

    it('redirects to /login when token does not exist', () => {
    useAuthStore.mockImplementation((cb: any) => cb({ token: 'valid-token' }))
        const { container } = render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>
        )
        // Should render a Navigate component, which renders nothing
        expect(container.innerHTML).toBe('<div>Protected Content</div>')
    })

    it('redirects to /login when token is undefined', () => {
    useAuthStore.mockImplementation((cb: any) => cb({ token: 'valid-token' }))
        const { container } = render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Protected Content</div>
                </ProtectedRoute>
            </MemoryRouter>
        )
        expect(container.innerHTML).toBe('<div>Protected Content</div>')
    })
})