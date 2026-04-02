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
        }, 0).toFixed(2);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="dashboard">
            <div>
                <h1>My Portfolio</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {error && <p>{error}</p>}
            {loading ? <p>Loading...</p> : (
                <div>
                    <h2>Total Value: ${calculateTotalValue()}</h2>
                    <ul>
                        {Array.isArray(holdings) && holdings.map(holding => {
                            const currentPrice = prices[holding.coinId]?.usd || 0;
                            const currentValue = (currentPrice * holding.quantity).toFixed(2);
                            const pnl = (currentValue - (holding.purchasePrice * holding.quantity)).toFixed(2);
                            return (
                                <li key={holding.id}>
                                    <strong>{holding.coinName}</strong> — 
                                    Quantity: {holding.quantity} | 
                                    Current Price: ${currentPrice} | 
                                    Value: ${currentValue} | 
                                    P&L: ${pnl}
                                </li>
                            )
                        })}
                    </ul>
                    <button onClick={() => navigate('/holdings')}>Manage Holdings</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;