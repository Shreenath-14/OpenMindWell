import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
