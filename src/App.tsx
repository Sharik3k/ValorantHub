import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './ui/Layout';
import HomePage from './pages/HomePage';
import AgentsPage from './pages/AgentsPage';
import MapsPage from './pages/MapsPage';
import WeaponsPage from './pages/WeaponsPage';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="agents" element={<AgentsPage />} />
        <Route path="maps" element={<MapsPage />} />
        <Route path="weapons" element={<WeaponsPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
