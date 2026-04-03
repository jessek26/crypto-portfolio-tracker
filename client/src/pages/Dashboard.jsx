import { useState, useEffect } from "react";
import { getHoldings, getPrices } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [holdings, setHoldings] = useState([]);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const holdingsData = await getHoldings();
                setHoldings(holdingsData);
                const pricesData = await getPrices();
                setPrices(pricesData);
                setLoading(false);
            } catch (error) {
                setError('failed to load dashboard');
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const calculateTotalValue = () => {
        if (!holdings || !Array.isArray(holdings)) return '0.00';

        return holdings.reduce((total, holding) => {
            const price = prices[holding.coinId]?.usd || 0;
            return total + (price * holding.quantity);
            }, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Portfolio</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> : (
                <div>
                    <h2>Total Value: ${calculateTotalValue()}</h2>
                    <ul className="holdings-list">
                        {Array.isArray(holdings) && holdings.map(holding => {
                            const rawPrice = prices[holding.coinId]?.usd || 0;
                            const currentPrice = rawPrice.toLocaleString('en-US');
                            const rawValue = rawPrice * holding.quantity;
                            const currentValue = rawValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            const pnl = (rawValue - (holding.purchasePrice * holding.quantity)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            return (
                                <li className="holding-item" key={holding.id}>
                                    <strong>{holding.coinName}</strong> — 
                                    Quantity: {holding.quantity} | 
                                    Current Price: ${currentPrice} | 
                                    Value: ${currentValue} | 
                                    <span style={{ color: parseFloat(pnl.replace(/,/g, '')) >= 0 ? 'var(--primary)' : 'var(--danger)' }}>
                                        {' | '}P&L: ${pnl}
                                    </span>                                
                                </li>
                            )
                        })}
                    </ul>
                    <button className="manage-btn" onClick={() => navigate('/holdings')}>Manage Holdings</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;