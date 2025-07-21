import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/submissions/user/${user.email}`)
      .then((res) => {
        const all = res.data.submissions;
        const pending = all.filter((s) => s.status === "pending");
        const approved = all.filter((s) => s.status === "approved");

        const totalEarnings = approved.reduce(
          (sum, curr) => sum + parseFloat(curr.payable_amount || 0),
          0
        );

        setSummary({
          totalSubmissions: all.length,
          pendingSubmissions: pending.length,
          totalEarnings,
        });
      })
      .catch((err) => {
        console.error("Error fetching submissions:", err);
      })
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1>worker dashboard</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-bl from-blue-50 to-yellow-50 shadow rounded-xl p-5 text-center hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-bold">Total Submissions</h2>
            <p className="text-2xl text-blue-600">{summary.totalSubmissions}</p>
          </div>
          <div className="bg-gradient-to-bl from-blue-50 to-yellow-50 shadow rounded-xl p-5 text-center hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-bold">Pending Submissions</h2>
            <p className="text-2xl text-yellow-600">
              {summary.pendingSubmissions}
            </p>
          </div>
          <div className="bg-gradient-to-bl from-blue-50 to-yellow-50 shadow rounded-xl p-5 text-center hover:shadow-xl transition duration-300">
            <h2 className="text-lg font-bold">Total Earnings</h2>
            <p className="text-2xl text-green-600">{summary.totalEarnings}🪙</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
