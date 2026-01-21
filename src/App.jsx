import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import IncidentListPage from './pages/IncidentListPage'
import IncidentDetailPage from './pages/IncidentDetailPage'
import ServiceConfigPage from './pages/ServiceConfigPage'
import WebhookIntegration from './components/WebhookIntegration'
import ChangelogDemo from './components/ChangelogDemo'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/incidents" element={<IncidentListPage />} />
          <Route path="/incidents/:id" element={<IncidentDetailPage />} />
          <Route path="/services" element={<ServiceConfigPage />} />
          <Route path="/changelog" element={<ChangelogDemo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
