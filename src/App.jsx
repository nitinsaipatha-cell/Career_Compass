import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CareerTrends from './pages/CareerTrends';
import AIMentor from './pages/AIMentor';
import SkillMatching from './pages/SkillMatching';
import Courses from './pages/Courses';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] text-white">
        <div className="w-8 h-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trends" element={<CareerTrends />} />
              <Route path="/mentor" element={<AIMentor />} />
              <Route path="/matching" element={<SkillMatching />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
