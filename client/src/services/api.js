const BASE_URL = 'https://crypto-portfolio-tracker-ivh7.onrender.com/api';

const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
})

const register = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return response.json();
}

const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

const getHoldings = async () => {
    const response = await fetch(`${BASE_URL}/holdings/`, {
        headers: getAuthHeaders()
    });
    return response.json()
}

const addHolding = async (coinId, coinName, quantity, purchasePrice) => {
    const response = await fetch(`${BASE_URL}/holdings/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ coinId, coinName, quantity, purchasePrice })
    });
    return response.json();
}

const updateHolding = async (id, quantity, purchasePrice) => {
    const response = await fetch (`${BASE_URL}/holdings/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ quantity, purchasePrice })
    });
    return response.json();
}

const deleteHolding = async (id) => {
    const response = await fetch(`${BASE_URL}/holdings/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    return response.json();
}

const getPrices = async () => {
    const response = await fetch(`${BASE_URL}/prices/`, {
        headers: getAuthHeaders()
    })
    return response.json();
}

export { register, login, getHoldings, addHolding, updateHolding, deleteHolding, getPrices };