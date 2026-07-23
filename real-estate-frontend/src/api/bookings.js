import api from './axios';

export const getBookings = () => api.get('/bookings');
export const createBooking = (data) => api.post('/bookings', data);
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);