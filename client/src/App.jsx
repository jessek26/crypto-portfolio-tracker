import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/holdings" element={<Holdings />} />
                <Route path='/dashboard' element={<Dashboard />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;