import { useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useUserInfo from "../../../Hooks/useUserInfo";

const Withdrawals = () => {
  const axiosSecure = useAxiosSecure();
  const { userInfo, loadUserInfo } = useUserInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current worker's total coins
  // const { data: coinData = {} } = useQuery({
  //   queryKey: ["coin", userInfo?.email],
  //   queryFn: async () => {
  //     const res = await axiosSecure.patch(`/users/coins/${userInfo?.email}`);
  //     return res.data;
  //   },
  //   enabled: !!userInfo?.email,
  // });

  const totalCoin = parseInt(userInfo.coins) || 0;
  const withdrawableDollar = totalCoin / 20;

  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const withdrawAmount = coinToWithdraw / 20;

  const handleWithdraw = async () => {
    setIsSubmitting(true);
    const date = new Date().toISOString();
    const withdrawalData = {
      worker_email: userInfo?.email,
      worker_name: userInfo?.displayName,
      withdrawal_coin: coinToWithdraw,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: date,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/withdrawals", withdrawalData);
      if (res.data.insertedId) {
        await axiosSecure.patch(`/users/coins/${userInfo?.email}`, {
          coins: totalCoin - coinToWithdraw,
        });
        Swal.fire("Success!", "Withdrawal request submitted!", "success");
        setCoinToWithdraw(0);
        setPaymentSystem("");
        setAccountNumber("");
        loadUserInfo;
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error",error);
      console.error("withdraw error",error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEligible = totalCoin >= 200;

  return (
    <div className="min-h-[calc(100vh-500px)] mt-10 sm:p-8 p-4 shadow-[_0_0_3px_#fca61b] rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Withdraw Funds</h2>

      <p>
        <strong>Total Coins:</strong> {userInfo.coins}
      </p>
      <p>
        <strong>Equivalent Dollar:</strong> ${withdrawableDollar.toFixed(2)}
      </p>

      {isEligible ? (
        <>
          <div>
            <label className="block">Coin to Withdraw:</label>
            <input
              type="number"
              min={0}
              max={totalCoin}
              value={coinToWithdraw}
              onChange={(e) => setCoinToWithdraw(Number(e.target.value))}
              className="input input-bordered w-full"
            />
            {coinToWithdraw > totalCoin && (
              <p className="text-red-500 mt-1">
                You cannot withdraw more than your total coins.
              </p>
            )}
            {coinToWithdraw > 0 && coinToWithdraw < 200 && (
              <p className="text-sm text-red-500 mt-1">
                You must withdraw at least 200 coins.
              </p>
            )}
          </div>

          <div>
            <label className="block">Withdraw Amount ($):</label>
            <input
              type="text"
              value={withdrawAmount.toFixed(2)}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block">Select Payment System:</label>
            <select
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select one
              </option>
              <option>Bkash</option>
              <option>Nagad</option>
              <option>Rocket</option>
              <option>Upay</option>
            </select>
          </div>

          <div>
            <label className="block">Account Number:</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <button
            onClick={handleWithdraw}
            disabled={
              coinToWithdraw < 20 ||
              coinToWithdraw > totalCoin ||
              !paymentSystem ||
              !accountNumber
            }
            className="btn bg-[#fca61b] border-none hover:shadow-[_0_0_10px_#fca61b] text-white w-full"
          >
            {isSubmitting ? "Processing..." : "Withdraw"}
          </button>
        </>
      ) : (
        <p className="text-red-500 font-semibold text-center">
          Insufficient coin to withdraw (minimum 200 coins required)
        </p>
      )}
    </div>
  );
};

export default Withdrawals;
