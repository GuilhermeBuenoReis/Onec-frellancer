import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard';
import { Upload } from './pages/app/upload';
import { Employee } from './pages/app/employee';
import { PartnerDashboard } from './pages/app/partner-dashboard';
import { Analises } from './pages/app/analysis';
import { Calendario } from './pages/app/calendar';
import { NotificationsPage } from './pages/app/notifications';
import { Financas } from './pages/app/finances';
import { Login } from './pages/auth/login';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
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
