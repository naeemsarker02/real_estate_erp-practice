import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <p className="mb-4">Welcome, {user?.name} ({user?.role})</p>

      {user?.role === 'admin' && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>Admin panel: project/unit তৈরি করার অপশন এখানে থাকবে (Phase 11-এ বানাবো)</p>
        </div>
      )}

      {user?.role === 'customer' && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <p>তোমার booking history এখানে দেখা যাবে (Phase 11-এ বানাবো)</p>
        </div>
      )}
    </div>
  );
}