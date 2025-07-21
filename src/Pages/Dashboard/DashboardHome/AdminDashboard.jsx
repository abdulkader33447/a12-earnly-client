import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { MdPayments, MdWorkHistory } from "react-icons/md";
import { FaCoins, FaUserTie } from "react-icons/fa";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //get current users
  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/for/admin");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  const totalPayment = payments.length;

  // console.log(payments);

  if (isLoading) return <LoadingSpinner />;
  // console.log("Worker:", data?.totalWorker);
  // console.log("Buyer:", data?.totalBuyer);
  // console.log("coins:", data?.totalCoin);
  return (
    <div className="min-h-[calc(100vh-500px)] p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 shadow-md rounded-lg p-6 hover:shadow-2xl  transition duration-300">
            <div className="flex justify-center">
              <MdWorkHistory className="size-10 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">
              Total Workers
            </h2>
            <p className="text-3xl font-bold text-blue-500">
              {data?.totalWorker}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 shadow-md rounded-lg p-6 hover:shadow-2xl  transition duration-300">
            <div className="flex justify-center">
              <FaUserTie className="text-green-500 size-10" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">
              Total Buyers
            </h2>
            <p className="text-3xl font-bold text-green-500">
              {data?.totalBuyer}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 shadow-md rounded-lg p-6 hover:shadow-2xl  transition duration-300">
            <div className="flex justify-center">
              <FaCoins className="text-[#fca61b] size-10" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">Total Coins</h2>
            <p className="text-3xl font-bold text-[#fca61b]">
              {data?.totalCoin}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 shadow-md rounded-lg p-6 hover:shadow-2xl  transition duration-300">
            <div className="flex justify-center">
              <MdPayments className="text-[#1ebcec] size-10" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">
              Total Payments
            </h2>
            <p className="text-3xl font-bold text-[#1ebcec]">{totalPayment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
