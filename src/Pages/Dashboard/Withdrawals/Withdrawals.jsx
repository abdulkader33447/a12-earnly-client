import { useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
// import useUserInfo from "../../../Hooks/useUserInfo";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const Withdrawals = () => {
  const axiosSecure = useAxiosSecure();
  // const { userInfo, loadUserInfo } = useUserInfo();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Get current worker's total coins
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  // console.log(data);

  const { data: pendingWithdrawals = [], isLoading: isPendingLoading } =
    useQuery({
      queryKey: ["pendingWithdrawals", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/withdraw/user/pending?email=${user?.email}`
        );
        return res.data?.withdraw || [];
      },
      enabled: !!user?.email,
    });
  if (isLoading || isPendingLoading) return <LoadingSpinner />;
  // console.log("user data getting", data?.coins);
  console.log(pendingWithdrawals);

  if (error)
    return <p className="text-red-500 text-center">Failed to load user data</p>;
  if (!data)
    return <p className="text-red-500 text-center">No user data found</p>;

  const totalCoin = parseInt(data?.coins) || 0;
  // const withdrawableDollar = totalCoin / 20;
  // const withdrawAmount = coinToWithdraw / 20;
  console.log(totalCoin);

  //Total coins in pending withdrawal
  const pendingCoins = pendingWithdrawals.reduce(
    (sum, item) => sum + (item.withdrawal_coins || 0),
    0
  );

  //Available coins = total - pending
  const availableCoins = totalCoin - pendingCoins;
  const withdrawableDollar = availableCoins / 20;
  const withdrawAmount = coinToWithdraw / 20;

  //Must have at least 200 coins after excluding pending
  const isEligible = availableCoins >= 20;
  const hasPending = pendingWithdrawals.length > 0;

  const handleWithdraw = async () => {
    setIsSubmitting(true);
    const date = new Date().toISOString();
    const withdrawalData = {
      worker_email: data?.email,
      worker_name: data?.displayName,
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
        // await axiosSecure.patch(`/users/coins/${data?.email}`, {
        //   coins: totalCoin - coinToWithdraw,
        // });
        Swal.fire("Success!", "Withdrawal request submitted!", "success");
        setCoinToWithdraw(0);
        setPaymentSystem("");
        setAccountNumber("");
        refetch();
      }
    } catch (error) {
      console.log("errorrrr", error);
      const errMesage = error.response.data.message || "Something went wrong!";
      Swal.fire("Error", errMesage, "error", error);
      console.error("withdraw error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const isEligible = totalCoin >= 200;

  return (
    <div className="min-h-[calc(100vh-500px)] mt-10 sm:p-8 p-4 shadow-[_0_0_3px_#fca61b] rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-center">Withdraw Funds</h2>

      <p>
        <strong>Total Coins:</strong> {data?.coins}
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
              max={availableCoins}
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
              coinToWithdraw > availableCoins ||
              isSubmitting ||
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
