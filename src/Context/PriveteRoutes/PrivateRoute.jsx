import React from "react";
import useAuth from "../../Hooks/useAuth";
import LoadingSpinner from "../../Pages/LoadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
