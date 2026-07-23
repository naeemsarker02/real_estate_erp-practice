import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBookings } from '../api/bookings';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 && <p className="text-gray-500">কোনো booking নেই এখনো।</p>}

      <div className="space-y-3">
        {bookings.map((booking) => (
          <Link
            key={booking.id}
            to={`/bookings/${booking.id}`}
            className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{booking.unit?.unit_number}</p>
              <p className="text-sm text-gray-600">{booking.unit?.project?.name}</p>
              <p className="text-sm text-gray-500">{booking.booking_date}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${statusColor[booking.status]}`}>
              {booking.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}