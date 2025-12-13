import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";

import LoginPage from "./pages/authPages/login";
import AdminDashboard from "./pages/admin/dashboard";
import VehicleManagement from "./pages/admin/vehicle";
import TripManagement from "./pages/admin/trips";
import TireManagement from "./pages/admin/tires";
import DriverManagement from "./pages/admin/drivers";
import DriverTrips from "./pages/driver/trips";
import Home from "./pages/home";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<Register />} /> */}

      <Route element={<ProtectedRoute allowedRoles={['Admin', 'Driver']}/>}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/vehicle" element={<VehicleManagement />} />
        <Route path="/admin/trips" element={<TripManagement />} />
        <Route path="/admin/tires" element={<TireManagement />} />
        <Route path="/admin/drivers" element={<DriverManagement />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['Driver']} />}>
        <Route path="/driver/trips" element={<DriverTrips />} />
      </Route>
    </Routes>
  );
};

export default App;
