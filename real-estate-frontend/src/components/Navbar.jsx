import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="font-bold text-lg">Real Estate</Link>
        <Link to="/projects" className="text-sm text-gray-700 hover:text-blue-600">Projects</Link>
        <Link to="/units" className="text-sm text-gray-700 hover:text-blue-600">Units</Link>
        {user.role === 'customer' && (
          <Link to="/my-bookings" className="text-sm text-gray-700 hover:text-blue-600">My Bookings</Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user.name} ({user.role})</span>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}