import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CampaignCreate from './pages/CampaignCreate';
import CampaignEdit from './pages/CampaignEdit';
import MessagePage from "./pages/MessagePage";
import ProfilesPage from "./pages/ProfilesPage";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns/create" element={<CampaignCreate />} />
          <Route path="/campaigns/edit/:id" element={<CampaignEdit />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 