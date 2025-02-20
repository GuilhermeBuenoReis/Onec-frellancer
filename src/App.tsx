import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard';
import { Investimentos } from './pages/app/investimentos';
import { Employee } from './pages/app/employee';
import { PartnerDashboard } from './pages/app/partner-dashboard';
import { Analises } from './pages/app/analysis';
import { Calendario } from './pages/app/Calendar';
import { NotificationsPage } from './pages/app/notifications';
import { Financas } from './pages/app/finances';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/investimentos" element={<Investimentos />} />
        <Route path="/rh" element={<Employee />} />
        <Route path="/rh/parceiros/:id" element={<PartnerDashboard />} />
        <Route path="/analises" element={<Analises />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/notificacoes" element={<NotificationsPage />} />
        <Route path="/financas" element={<Financas />} />
      </Routes>
    </Router>
  );
}
