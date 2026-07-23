import { useEffect, useState } from 'react';
import { getUnits } from '../api/units';
import { createBooking } from '../api/bookings';
import { useAuth } from '../context/AuthContext';

export default function UnitListPage() {
  const { user } = useAuth();
  const [units, setUnits] = useState([]);
  const [filters, setFilters] = useState({ location: '', min_price: '', max_price: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [bookingMsg, setBookingMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    setLoading(true);
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, value]) => value !== '')
    );
    try {
      const res = await getUnits(cleanFilters);
      setUnits(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUnits();
  };

  const handleBook = async (unitId) => {
    setBookingMsg({ type: '', text: '' });
    try {
      await createBooking({
        unit_id: unitId,
        booking_date: new Date().toISOString().split('T')[0],
      });
      setBookingMsg({ type: 'success', text: 'Booking request সফলভাবে পাঠানো হয়েছে!' });
      fetchUnits();
    } catch (err) {
      const message = err.response?.data?.message || 'Booking ব্যর্থ হয়েছে।';
      setBookingMsg({ type: 'error', text: message });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Units</h1>

      {bookingMsg.text && (
        <p
          className={`mb-4 p-3 rounded ${
            bookingMsg.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {bookingMsg.text}
        </p>
      )}

      <form onSubmit={handleSearch} className="flex gap-2 mb-6 flex-wrap">
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="min_price"
          placeholder="Min price"
          type="number"
          value={filters.min_price}
          onChange={handleFilterChange}
          className="border p-2 rounded w-32"
        />
        <input
          name="max_price"
          placeholder="Max price"
          type="number"
          value={filters.max_price}
          onChange={handleFilterChange}
          className="border p-2 rounded w-32"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All status</option>
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => (
            <div key={unit.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">
                {unit.unit_number} — Floor {unit.floor}
              </h3>
              <p className="text-sm text-gray-600">{unit.project?.location}</p>
              <p className="text-sm">
                {unit.bedroom} bed, {unit.bathroom} bath, {unit.size} sqft
              </p>
              <p className="font-bold mt-2">৳ {Number(unit.price).toLocaleString()}</p>
              <span
                className={`inline-block text-xs px-2 py-1 rounded ${
                  unit.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {unit.status}
              </span>

              {user?.role === 'customer' && unit.status === 'available' && (
                <button
                  onClick={() => handleBook(unit.id)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}