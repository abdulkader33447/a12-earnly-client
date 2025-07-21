import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";

const WithdrawRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: withdraw,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["withdraws"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdraws");
      return res.data.withdraws;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  // console.log(withdraw);

  const handleWithdraw = async (withdrawal) => {
    const { _id, worker_email, withdrawal_coin } = withdrawal;

    try {
      const res = await axiosSecure.patch(`/withdraw/approve/${_id}`);

      if (
        res.data.result.modifiedCount > 0 ||
        res.data.result.matchedCount > 0
      ) {
        const coinRes = await axiosSecure.patch(
          `/users/decrease-coins/${worker_email}`,
          {
            coins: withdrawal_coin,
          }
        );

        if (coinRes.data.modifiedCount > 0 || coinRes.data.matchedCount > 0) {
          Swal.fire(
            "Success",
            "Withdraw approved and coins deducted",
            "success"
          );
          refetch();
        } else {
          Swal.fire(
            "Partial Success",
            "Approved but coin deduction failed",
            "warning"
          );
          refetch();
        }
      } else {
        Swal.fire("Failed", "Withdrawal approval failed", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h2>Withdraw Requests</h2>
      {withdraw.length > 0 ? (
        <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl shadow-md">
          <div className="overflow-x-auto max-h-[390px]">
            <table className="table w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th>#</th>
                  <th>Worker Name</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {withdraw.map((wdr, index) => (
                  <tr key={wdr._id}>
                    <td>{index + 1}</td>
                    <td>{wdr.worker_name}</td>
                    <td>{wdr.withdrawal_amount}$</td>
                    <td>{wdr.status}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm border-none"
                        onClick={() => handleWithdraw(wdr)}
                      >
                        <FaCheck />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-[#fca61b] text-xl font-bold">
            No withdrawal requests
          </h1>
        </div>
      )}
    </div>
  );
};

export default WithdrawRequests;
