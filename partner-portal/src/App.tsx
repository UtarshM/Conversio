import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PartnerAuthProvider } from "./context/PartnerAuthContext";
import { PartnerLandingPage } from "./pages/PartnerLandingPage";
import { PartnerDashboardPage } from "./pages/PartnerDashboardPage";
import { WhiteLabelConsolePage } from "./pages/WhiteLabelConsolePage";
import { ClientWorkspacesPage } from "./pages/ClientWorkspacesPage";
import { CommissionsLedgerPage } from "./pages/CommissionsLedgerPage";

export default function App() {
  return (
    <PartnerAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PartnerLandingPage />} />
          <Route path="/dashboard" element={<PartnerDashboardPage />} />
          <Route path="/white-label" element={<WhiteLabelConsolePage />} />
          <Route path="/workspaces" element={<ClientWorkspacesPage />} />
          <Route path="/commissions" element={<CommissionsLedgerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PartnerAuthProvider>
  );
}
