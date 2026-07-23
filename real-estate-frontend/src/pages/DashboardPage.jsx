import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../api/dashboard';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="mb-6 text-gray-600">স্বাগতম, {user?.name} ({user?.role})</p>

      {loading && <p>Loading stats...</p>}

      {stats && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Projects" value={stats.total_projects} color="bg-blue-100 text-blue-700" />
            <StatCard label="Total Units" value={stats.total_units} color="bg-green-100 text-green-700" />
            <StatCard label="Total Bookings" value={stats.total_bookings} color="bg-amber-100 text-amber-700" />
            <StatCard label="Revenue" value={`৳ ${Number(stats.revenue).toLocaleString()}`} color="bg-purple-100 text-purple-700" />
          </div>

          {stats.units_by_status && (
            <div className="bg-white p-4 rounded shadow mb-6">
              <h2 className="font-semibold mb-3">Units by status</h2>
              <div className="flex gap-4">
                {Object.entries(stats.units_by_status).map(([status, count]) => (
                  <div key={status} className="text-sm">
                    <span className="font-bold">{count}</span> {status}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {user?.role === 'admin' && (
        <div className="bg-white p-4 rounded shadow flex gap-4">
          <Link to="/projects/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create Project
          </Link>
          <Link to="/units/create" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Create Unit
          </Link>
        </div>
      )}

      {user?.role === 'customer' && (
        <div className="bg-white p-4 rounded shadow">
          <Link to="/my-bookings" className="text-blue-600 underline">
            তোমার booking history দেখো →
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}