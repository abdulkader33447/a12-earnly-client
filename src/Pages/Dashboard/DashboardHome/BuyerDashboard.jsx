import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { FaClipboardList, FaHourglassHalf } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

const BuyerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-stats?email=${user.email}`);
      return res.data;
    },
  });
  // console.log("stats", stats);
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1>buyer dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 shadow-md rounded-lg p-6 text-center hover:shadow-2xl  transition duration-300">
          <div className="flex justify-center">

          <FaClipboardList className="text-blue-600 size-10"/>
          </div>
          <h2 className="text-xl font-semibold mb-2">Total Tasks</h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalTaskCount || 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 shadow-md rounded-lg p-6 text-center hover:shadow-2xl  transition duration-300">
          <div className="flex justify-center"><FaHourglassHalf className="text-orange-500 size-10"/></div>
          <h2 className="text-xl font-semibold mb-2">Pending Workers</h2>
          <p className="text-3xl font-bold text-orange-500">
            {stats.pendingWorkerCount || 0}
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 shadow-md rounded-lg p-6 text-center hover:shadow-2xl  transition duration-300">
          <div className="flex justify-center"><MdOutlinePayments className="text-green-600 size-10"/></div>
          <h2 className="text-xl font-semibold mb-2">Total Payment</h2>
          <p className="text-3xl font-bold text-green-600">
            ${stats.totalPayment?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
