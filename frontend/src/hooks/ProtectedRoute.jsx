import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-700">
          Vérification des permissions...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role;

  if (userRole && allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else {
    console.warn(
      `Accès refusé. Rôle actuel: ${userRole}. Rôles requis: ${allowedRoles.join(
        ", "
      )}`
    );

    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
