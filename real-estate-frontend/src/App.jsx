import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProjectListPage from './pages/ProjectListPage';
import CreateProjectPage from './pages/CreateProjectPage';
import UnitListPage from './pages/UnitListPage';
import CreateUnitPage from './pages/CreateUnitPage';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingDetailPage from './pages/BookingDetailPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

          <Route path="/projects" element={<ProtectedRoute><ProjectListPage /></ProtectedRoute>} />
          <Route
            path="/projects/create"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateProjectPage />
              </ProtectedRoute>
            }
          />

          <Route path="/units" element={<ProtectedRoute><UnitListPage /></ProtectedRoute>} />
          <Route
            path="/units/create"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateUnitPage />
              </ProtectedRoute>
            }
          />

          <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
          <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetailPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;