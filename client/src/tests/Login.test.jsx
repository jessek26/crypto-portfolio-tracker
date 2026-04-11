import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import userEvent from '@testing-library/user-event'

vi.mock('../services/api', () => ({
    login: vi.fn()
}))

describe('Login Component', () => {
    test('renders login form correctly', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();        
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    })

    test('allows user to type in email and password fields', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        await userEvent.type(emailInput, 'test@test.com');
        await userEvent.type(passwordInput, 'password123');

        expect(emailInput.value).toBe('test@test.com');
        expect(passwordInput.value).toBe('password123');
});})