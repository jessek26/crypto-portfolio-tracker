import { useState } from "react";
import { register } from '../services/api';
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await register(email, password);
                localStorage.setItem('token', response.token)
            
            navigate('/dashboard')
        } catch (error) {
            setError('invalid email or password')
        }
    }

        return (
            <div className="register-page">
                <form onSubmit={handleSubmit} className="register-form">
                <h1 className="register-heading">Register</h1>
                    <input 
                    type="email"
                    className="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    
                    <input
                    type="password" 
                    className="password-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     />

                    <button className="submit-btn">Register</button>
                    {error && <p>{error}</p>}

                    <Link to='/'>Already have an account? Login here</Link>
                </form>
            </div>
        );
    }

export default Register;