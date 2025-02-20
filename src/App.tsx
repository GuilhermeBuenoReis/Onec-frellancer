// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard';
import { Investimentos } from './pages/app/investimentos';
import { Employee } from './pages/app/employee';
import { PartnerDashboard } from './pages/app/partner-dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/investimentos" element={<Investimentos />} />
        <Route path="/rh" element={<Employee />} />
        <Route path="/rh/parceiros/:id" element={<PartnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
