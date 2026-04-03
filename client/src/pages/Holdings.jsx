import { useState, useEffect } from "react";
import { addHolding, getHoldings, updateHolding, deleteHolding } from "../services/api";
import { useNavigate } from "react-router-dom";

function Holdings(){
    const [holdings, setHoldings] = useState([]);
    const [coinId, setCoinId] = useState('');
    const [coinName, setCoinName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchHoldings = async () => {
         try{
        setLoading(true);

        const data = await getHoldings();
        setHoldings(data);

        setLoading(false);
        } catch (error) {
        setError('an error occured')
        }
    
    }

    useEffect(() => {
        fetchHoldings(); 
        }, []);

const handleAdd = async (e) => {
    e.preventDefault();
    try {
        await addHolding(coinId, coinName, quantity, purchasePrice);
        await fetchHoldings(); // refresh the list
        // clear the form
        setCoinId('');
        setCoinName('');
        setQuantity('');
        setPurchasePrice('');
    } catch (error) {
        setError('failed to add holding');
    }
}

const handleDelete = async (id) => {
    try {
        await deleteHolding(id);
        await fetchHoldings(); // refresh the list
    } catch (error) {
        setError('failed to delete holding');
    }
}

    return (
        <div className="holdings-page">
            <form onSubmit={handleAdd}>
            <input placeholder="Coin ID (e.g. bitcoin)" value={coinId} onChange={(e) => setCoinId(e.target.value)} />
            <input placeholder="Coin Name (e.g. Bitcoin)" value={coinName} onChange={(e) => setCoinName(e.target.value)} />
            <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input placeholder="Purchase Price" type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
            <button type="submit">Add Holding</button>
        </form>

        {loading ? <p>Loading...</p> : (
            <ul>
{Array.isArray(holdings) && holdings.map(holding => (                    <li key={holding.id}>
                        {holding.coinName} — {holding.quantity} @ ${holding.purchasePrice}
                        <button onClick={() => handleDelete(holding.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
}

export default Holdings;