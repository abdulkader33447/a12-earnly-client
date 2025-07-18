import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth"; // adjust path
import useUserInfo from "../../../Hooks/useUserInfo"; // to refetch coin
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const coinPackages = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

const PurchaseCoin = () => {
  const { user } = useAuth();
  const { refetch } = useUserInfo();
  const axiosSecure = useAxiosSecure();

  const handlePurchase = (coins, price) => {
    Swal.fire({
      title: `Confirm Purchase`,
      html: `<b>${coins} coins</b> for <b>$${price}</b>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Pay (Dummy)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/api/payments", {
            email: user.email,
            coins,
            amount: price,
            paymentMethod: "dummy",
            paidAt: new Date().toLocaleString(),
          });

          if (res.data?.success) {
            Swal.fire(
              "Payment Successful",
              `Coins added! Transaction ID: ${res.data.transactionId}`,
              "success"
            );
            refetch();
          }
        } catch (err) {
          Swal.fire("Error", "Something went wrong", "error");
        }
      }
    });
  };

  return (
    <div className="sm:p-4 min-h-[calc(100vh-500px)]">
      <h1 className="text-3xl font-bold text-center mb-3">Purchase Coins</h1>
      <p className="text-center mb-10">
        Purchase coins with dummy payment system
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {coinPackages.map(({ coins, price }) => (
          <div
            key={coins}
            className="bg-gradient-to-tl from-yellow-50 to-green-50  rounded-2xl shadow-[_0_0_8px_blue-50] p-6 text-center border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-4xl font-extrabold text-indigo-600">
              {coins} Coins
            </h2>
            <p className="text-xl mt-2 text-gray-700">${price}</p>
            <button
              onClick={() => handlePurchase(coins, price)}
              className="btn btn-outline mt-4 px-5 py-2 text-[#fca61b] hover:text-white rounded-lg hover:bg-[#fca61b] hover:shadow-[_0_0_15px_#fca61b] hover:border-none transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
