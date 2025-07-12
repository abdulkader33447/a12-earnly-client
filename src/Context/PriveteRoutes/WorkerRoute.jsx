import useAuth from "../../Hooks/useAuth";
import useUserCategory from "../../Hooks/useUserCategory";
import LoadingSpinner from "../../Pages/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

const WorkerRoute = ({ children }) => {
  const { user, loadnig } = useAuth();
  const { category, categoryLoading } = useUserCategory();

  if (loadnig || categoryLoading) {
    return <LoadingSpinner />;
  }

  if (!user || category !== "worker") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default WorkerRoute;
