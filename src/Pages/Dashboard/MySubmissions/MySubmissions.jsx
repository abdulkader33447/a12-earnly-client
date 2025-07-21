import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: approved = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !!user?.email, // only fetch if email exists
    queryKey: ["approvedSubmissions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/user/${user.email}`);
      return res.data.submissions.filter((s) => s.status === "approved");
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1>MySubmissions</h1>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">
          Approved Submissions ({approved.length})
        </h2>
        {approved.length > 0 ? (
          <>
            <div className="overflow-x-auto max-h-[450px]">
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
          </>
        ) : (
          <div className="text-center">
            <p>
              Hey <span className="font-bold">Mr.{user.displayName} </span>You
              have not submitted any work yet. <br />
              go to <br />{" "}
              <Link
                to="/dashboard/taskList"
                className="btn btn-outline my-5 hover:bg-[#fca61b] text-[#fca61b] rounded-lg hover:text-white hover:shadow-[0_0_20px_#fca61b] hover:border-none"
              >
                Task List
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissions;
