import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', role: 'customer', phone: '',
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/dashboard');
        } catch (err) {
            setError('Registration ব্যর্থ হয়েছে, তথ্য চেক করো।');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6">Register</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
                <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded mb-4" />

                <select name="role" onChange={handleChange} className="w-full p-2 border rounded mb-4">
                    <option value="customer">Customer</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Register
                </button>

                <p className="mt-4 text-sm">
                    আগে থেকেই account আছে? <Link to="/login" className="text-blue-600">Login করো</Link>
                </p>
            </form>
        </div>
    );
}