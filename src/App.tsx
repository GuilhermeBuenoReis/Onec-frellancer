import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard';
import { Upload } from './pages/app/upload';
import { Employee } from './pages/app/employee';
import { PartnerDashboard } from './pages/app/partner-dashboard';
import { Pending } from './pages/app/pending';
import { Calendario } from './pages/app/calendar';
import { NotificationsPage } from './pages/app/notifications';
import { Financas } from './pages/app/finances';
import { Login } from './pages/auth/login';
import { PendingDetails } from './pages/app/pending-details';
import { PortalControllDashboard } from './pages/app/portal-controll';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/rh" element={<Employee />} />
        <Route path="/rh/parceiros/:id" element={<PartnerDashboard />} />
        <Route path="/pendencias" element={<Pending />} />
        <Route path="/pendencias/:id" element={<PendingDetails />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/notificacoes" element={<NotificationsPage />} />
        <Route path="/financas" element={<Financas />} />
        <Route path="//controle-portal" element={<PortalControllDashboard />} />
      </Routes>
    </Router>
  );
}
