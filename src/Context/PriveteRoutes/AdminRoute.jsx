import React from "react";
import useAuth from "../../Hooks/useAuth";
import useUserCategory from "../../Hooks/useUserCategory";
import LoadingSpinner from "../../Pages/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { category, categoryLoading } = useUserCategory();

  if (loading || categoryLoading) {
    return <LoadingSpinner />;
  }

  if (!user || category !== "admin") {
    return <Navigate to="/forbidden" />;
  }
  return children;
};

export default AdminRoute;
