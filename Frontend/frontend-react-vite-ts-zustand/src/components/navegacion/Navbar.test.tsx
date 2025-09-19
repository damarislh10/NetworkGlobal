import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuthStore } from '@store/autenticacion/auth';

// Mock useAuthStore
jest.mock('@store/autenticacion/auth', () => ({
    useAuthStore: jest.fn(),
}));

describe('Navbar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock para que Navbar no falle por falta de datos
        (useAuthStore as unknown as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() });
    });

       it('renders component', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        // No assertions, solo renderiza
    });
});