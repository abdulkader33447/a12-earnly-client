import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/submissions/user/${user.email}`)
      .then((res) => {
        const approvedSubs = res.data.submissions.filter(
          (s) => s.status === "approved"
        );
        setApproved(approvedSubs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user?.email, axiosSecure]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1>MySubmissions</h1>
      <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Approved Submissions ({approved.length})
      </h2>
      <div className="overflow-x-auto max-h-[400px]">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approved.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>${item.payable_amount}</td>
                <td>{item.buyer_name}</td>
                <td>
                  <span className="badge badge-success capitalize">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default MySubmissions;
