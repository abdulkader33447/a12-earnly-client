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
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="sm:text-3xl text-center font-bold my-5">
        Payment History
      </h1>
      <div>
        {payments.length > 0 ? (
          <>
            <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl">
              <table className="table w-full">
                <thead className="bg-gray-300">
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
          </>
        ) : (
          <>
            <div className="text-center">
              <h1>
                Hey {" "}
                <span className="text-black font-bold">Mr.
                  {user?.displayName}{" "}
                </span>
                You have not purchased any coins yet. <br /> go to
              </h1>
              <Link
                to="/dashboard/purchaseCoin"
                className="btn btn-outline my-5 hover:bg-[#fca61b] text-[#fca61b] rounded-lg hover:text-white hover:shadow-[0_0_20px_#fca61b] hover:border-none"
              >
                Purchase Coin
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
