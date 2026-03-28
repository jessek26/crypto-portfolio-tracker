import { useState } from "react";
import { login } from '../services/api';
import { useNavigate, Link } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await login(email, password); //uses login function to take their email and password
            localStorage.setItem('token', response.token) //stores token in localStorage

        navigate('/dashboard'); //navigates user to their dashborad upon successful login
        } catch (error) {
            setError('invalid email or password')
        }

    }

    return (
        <div className="login-page">
            <div>
                <h1 className="login-heading">Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                type="email"
                className="email-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

                <input
                type="password" 
                className="password-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

                <button className="submit-btn">Login</button>
                {error && <p>{error}</p>}

                <Link to='/register'>Don't have an account? Register here</Link>
            </form>
        </div>
    );
}

export default Login;