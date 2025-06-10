import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/app/Dashboard/index';
import { Upload } from './pages/app/upload';
import { PartnerPage } from './pages/app/Partner/index';
import { PartnerDashboard } from './pages/app/partner-dashboard';
import { Pending } from './pages/app/pending';
import { Negotiation } from './pages/app/negotiation';
import { Login } from './pages/auth/login';
import { PendingDetails } from './pages/app/pending-details';
import { CreateNegotiation } from './components/create-negotiation';
import { UploadHonorary } from './components/upload-honorary';
import { InformationHonorary } from './components/information-hononary';
import { FilteredContractsPage } from './pages/app/Filtered-contract/index';

import { ContestationPage } from './pages/app/Contestation/index';
import { ActiveNegotiationPage } from './pages/app/Negotiation/active-negoation';
import { ClientReceiptDashboardPage } from './pages/app/Client-receipt/client-dashboard/';
import { NegotiationDetails } from './pages/app/negotiation-datails';
import { ContractDetailPage } from './pages/app/Contract-details/';
import { CreateContractPage } from './pages/app/Create-contract/';
import { CreatePartnerPage } from './pages/app/Create-partner/';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/rh" element={<PartnerPage />} />
        <Route path="/rh/parceiros/:id" element={<PartnerDashboard />} />
        <Route path="/pendencias" element={<Pending />} />
        <Route path="/pendencias/:id" element={<PendingDetails />} />
        <Route path="/negotiation" element={<Negotiation />} />
        <Route path="/create-negotiation" element={<CreateNegotiation />} />
        <Route path="/rh/parceiros/create" element={<CreatePartnerPage />} />
        <Route path="/create-contract" element={<CreateContractPage />} />
        <Route path="/portal/:partnerId/upload" element={<UploadHonorary />} />
        <Route
          path="/portal/information-honorary/:partnerId"
          element={<InformationHonorary />}
        />
        <Route path="/tels" element={<FilteredContractsPage />} />
        <Route path="/contract/:id" element={<ContractDetailPage />} />
        <Route path="/contestation" element={<ContestationPage />} />
        <Route path="/get-contracts" element={<ActiveNegotiationPage />} />
        <Route
          path="/client-dashboard"
          element={<ClientReceiptDashboardPage />}
        />
        <Route path="/negotiation/:id" element={<NegotiationDetails />} />
      </Routes>
    </Router>
  );
}
