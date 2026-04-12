import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

vi.mock('../services/api', () => ({
    getHoldings: vi.fn().mockResolvedValue([]),
    getPrices: vi.fn().mockResolvedValue({})
}))

describe('Dashboard Component', () => {
    test('renders dashboard correctly', async () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        )
        
        expect(screen.getByRole('heading', { name: /my portfolio/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /manage holdings/i })).toBeInTheDocument();
        });
    })
})      


