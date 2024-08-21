import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from 'pages/404/404';
import AppLayout from 'pages/layout/layout/layout';
import Dashboard from 'pages/module/admin/dashboard/dashboard';
import AlertHome from 'pages/module/admin/alerts/alert';
import SpecialDay from 'pages/module/admin/specialday/specialday';
import PlayBack from 'pages/module/admin/playback/playback';
import Settings from 'pages/module/admin/settings/settings';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="alert" element={<AlertHome />} />
        <Route path="specialday" element={<SpecialDay />} />
        <Route path="playback" element={<PlayBack />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
