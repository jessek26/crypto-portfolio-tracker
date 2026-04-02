import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Holdings from './pages/Holdings';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/holdings" element={<ProtectedRoute><Holdings /></ProtectedRoute>} />
                <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;