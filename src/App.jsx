import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CareerTrends from './pages/CareerTrends';
import AIMentor from './pages/AIMentor';
import SkillMatching from './pages/SkillMatching';
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trends" element={<CareerTrends />} />
          <Route path="/mentor" element={<AIMentor />} />
          <Route path="/matching" element={<SkillMatching />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
