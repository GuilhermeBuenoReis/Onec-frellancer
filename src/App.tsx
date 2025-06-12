import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Upload } from './pages/app/upload';
import { Login } from './pages/auth/login';
import { CreateNegotiation } from './components/create-negotiation';
import { UploadHonorary } from './components/upload-honorary';
import { InformationHonorary } from './components/information-hononary';
import { FilteredContractsPage } from './pages/app/Filtered-contract/';

import { DashboardPage } from './pages/app/Dashboard/';
import { PartnerPage } from './pages/app/Partner/';
import { ContestationPage } from './pages/app/Contestation/';
import { ActiveNegotiationPage } from './pages/app/Negotiation/active-negoation';
import { ClientReceiptDashboardPage } from './pages/app/Client-receipt/client-dashboard/';
import { ContractDetailPage } from './pages/app/Contract-details/';
import { CreateContractPage } from './pages/app/Create-contract/';
import { CreatePartnerPage } from './pages/app/Create-partner/';
import { NegotiationDetailPage } from './pages/app/Negotiation-datails/';
import { NegotiationDashboardPage } from './pages/app/Negotiation-dashboard';
import { PartnerDashboardPage } from './pages/app/Partner-dashboard/';
import { PendingDetailsPage } from './pages/app/Pending-details/';
import { PendingPage } from './pages/app/Pending/index';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/rh" element={<PartnerPage />} />
        <Route path="/rh/parceiros/:id" element={<PartnerDashboardPage />} />
        <Route path="/pendencias" element={<PendingPage />} />
        <Route path="/pendencias/:id" element={<PendingDetailsPage />} />
        <Route path="/negotiation" element={<NegotiationDashboardPage />} />
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
        <Route path="/negotiation/:id" element={<NegotiationDetailPage />} />
      </Routes>
    </Router>
  );
}
