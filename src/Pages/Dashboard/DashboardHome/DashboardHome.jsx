import React from "react";
import useUserCategory from "../../../Hooks/useUserCategory";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import BuyerDashboard from "./BuyerDashboard";
import WorkerDashboard from "./WorkerDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { category, categoryLoading } = useUserCategory();
  if (categoryLoading) {
    return <LoadingSpinner />;
  } else if (category === "buyer") {
    return <BuyerDashboard />;
  } else if (category === "worker") {
    return <WorkerDashboard />;
  } else if (category === "admin") {
    return <AdminDashboard />;
  }
};

export default DashboardHome;
