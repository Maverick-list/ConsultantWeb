import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClientLayout from './components/Layout/ClientLayout';
import Home from './pages/Home';
import Consult from './pages/Consult';
import Room from './pages/Room';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import ConsultantOnboarding from './pages/ConsultantOnboarding';
import Profile from './pages/Profile';
import History from './pages/History';

import { HelmetProvider } from 'react-helmet-async';

import ConsultantLogin from './pages/ConsultantLogin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem('user_role');
  if (userRole !== 'consultant' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="consult" element={<Consult />} />
            <Route path="profile" element={<Profile />} />
            <Route path="history" element={<History />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="join-consultant" element={<ConsultantOnboarding />} />
          </Route>
          <Route path="/room/:bookingId" element={<Room />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/consultant-login" element={<ConsultantLogin />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
