import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/api/payments/history?email=${user.email}`)
        .then((res) => {
          if (res.data.success) {
            setPayments(res.data.payments);
          }
        })
        .catch((error) => {
          console.error("Error fetching payment history", error);
        });
    }
  }, [user, axiosSecure]);

  return (
    <div className="min-h-[calc(100vh-500px)]">
      <h1 className="text-xl sm:text-3xl text-center font-bold my-5">
        Payment History
      </h1>

      {!payments.length > 0 ? (
        <div className="text-center border border-gray-200 rounded-lg p-5">
          <h1>
            Hey{" "}
            <span className="text-black font-bold hover:text-gray-400">
              Mr. {user?.displayName}
            </span>
            , you have not purchased any coins yet.
            <br /> Go to
          </h1>
          <Link
            to="/dashboard/purchaseCoin"
            className="btn btn-outline my-5 hover:bg-[#fca61b] text-[#fca61b] rounded-lg hover:text-white hover:shadow-[0_0_20px_#fca61b] hover:border-none"
          >
            Purchase Coin
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl shadow-md">
          <div className="max-h-[450px] overflow-y-auto">
            <table className="table w-full text-xs sm:text-sm md:text-base">
              <thead className="bg-gray-300 text-gray-700">
                <tr>
                  <th>#</th>
                  <th>Coins</th>
                  <th>Amount ($)</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{payment.coins}</td>
                    <td>${payment.amount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>{payment.transactionId || "N/A"}</td>
                    <td>{payment.paidAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
