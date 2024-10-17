import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from 'pages/404/404';
import AppLayout from 'pages/layout/layout/layout';
import Dashboard from 'pages/module/admin/dashboard/dashboard';
import AlertHome from 'pages/module/admin/alerts/alert';
import SpecialDay from 'pages/module/admin/specialday/specialday';
import PlayBack from 'pages/module/admin/playback/playback';
import Settings from 'pages/module/admin/settings/settings';
import ManageUsers from 'pages/module/admin/settings/ManageUsers/manageusers';
import Notifications from 'pages/module/admin/settings/Notification/notifications';
import ResetPassword from 'pages/module/admin/settings/ResetPassword/resetpassword';
import StoreTiming from 'pages/module/admin/settings/StoreTiming/storetiming';
import StoreCameras from 'pages/module/admin/settings/cameras/cameras';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="alert" element={<AlertHome />} />
        <Route path="specialday" element={<SpecialDay />} />
        <Route path="playback" element={<PlayBack />} />
        <Route path="settings" element={<Settings />} >
          <Route path="users" element={<ManageUsers />} />
          <Route path="timing" element={<StoreTiming />} />
          <Route path="resetpasswords" element={<ResetPassword />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="cameras" element={<StoreCameras />} />
          
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
