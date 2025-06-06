import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/app/dashboard';
import { Upload } from './pages/app/upload';
import { Employee } from './pages/app/employee';
import { PartnerDashboard } from './pages/app/partner-dashboard';
import { Pending } from './pages/app/pending';
import { Negotiation } from './pages/app/negotiation';
import { Login } from './pages/auth/login';
import { PendingDetails } from './pages/app/pending-details';
import { CreateNegotiation } from './components/create-negotiation';
import { CreatePartner } from './pages/app/create-partner';
import { CreateContract } from './pages/app/create-contract';
import { UploadHonorary } from './components/upload-honorary';
import { InformationHonorary } from './components/information-hononary';
import { FilteredContracts } from './pages/app/filtered-contract';
import { ContractDetail } from './pages/app/contract-details';
import { Contestation } from './pages/app/contestation-by-partner';
import { ActiveContracts } from './pages/app/active-contracts';
import { ClientsDashboard } from './pages/app/client-dashboard';
import { NegotiationDetails } from './pages/app/negotiation-datails';

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
        <Route path="/negotiation" element={<Negotiation />} />
        <Route path="/create-negotiation" element={<CreateNegotiation />} />
        <Route path="/rh/parceiros/create" element={<CreatePartner />} />
        <Route path="/create-contract" element={<CreateContract />} />
        <Route path="/portal/:partnerId/upload" element={<UploadHonorary />} />
        <Route
          path="/portal/information-honorary/:partnerId"
          element={<InformationHonorary />}
        />
        <Route path="/tels" element={<FilteredContracts />} />
        <Route path="/contract/:id" element={<ContractDetail />} />
        <Route path="/contestation" element={<Contestation />} />
        <Route path="/get-contracts" element={<ActiveContracts />} />
        <Route path="/client-dashboard" element={<ClientsDashboard />} />
        <Route path="/negotiation/:id" element={<NegotiationDetails />} />
      </Routes>
    </Router>
  );
}
