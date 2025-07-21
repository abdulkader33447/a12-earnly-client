import { NavLink, Outlet } from "react-router";
import Footer from "../Components/Footer/Footer";
import {
  FaCheckCircle,
  FaClipboardCheck,
  FaCoins,
  FaHistory,
  FaHome,
  FaListAlt,
  FaMoneyCheckAlt,
  FaPlus,
  FaTasks,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import useUserCategory from "../Hooks/useUserCategory";
import DashboardNavbar from "../Components/DashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
  const { category, categoryLoading } = useUserCategory();
  // console.log("user category is:",category)

  return (
    <div>
      <DashboardNavbar />
      <div className="drawer lg:drawer-open lg:w-10/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-2">
          <div className="navbar w-full  lg:hidden">
            <div className="flex-none  lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square  rounded-lg "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Dashboard</div>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu text-base-content min-h-full w-60 p-4 bg-gradient-to-t from-blue-50 via-green-50 to-blue-50 rounded-lg">
            <li>
              <NavLink
                to="/dashboard"
                className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
              >
                <FaHome className="inline-block mr-2" /> Home
              </NavLink>
            </li>

            {/*-------------- worker links --------------*/}
            {!categoryLoading && category === "worker" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/taskList"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaTasks className="inline-block mr-2" /> Task List
                  </NavLink>
                </li>
                {/* My Submissions */}
                <li>
                  <NavLink
                    to="/dashboard/mySubmissions"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaCheckCircle className="inline-block mr-2" /> My
                    Submissions
                  </NavLink>
                </li>

                {/* Withdrawals */}
                <li>
                  <NavLink
                    to="/dashboard/withdrawals"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaWallet className="inline-block mr-2" /> Withdrawals
                  </NavLink>
                </li>
              </>
            )}

            {/*---------buyer links-------------  */}
            {!categoryLoading && category === "buyer" && (
              <>
                {" "}
                {/* Add New Tasks */}
                <li>
                  <NavLink
                    to="/dashboard/addNewTask"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaPlus className="inline-block mr-2" /> Add New Task
                  </NavLink>
                </li>
                {/* My Tasks */}
                <li>
                  <NavLink
                    to="/dashboard/myTasks"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaTasks className="inline-block mr-2" /> My Tasks
                  </NavLink>
                </li>
                {/* Purchase Coin */}
                <li>
                  <NavLink
                    to="/dashboard/purchaseCoin"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaCoins className="inline-block mr-2" /> Purchase Coin
                  </NavLink>
                </li>
                {/* Payment History */}
                <li>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaHistory className="inline-block mr-2" /> Payment History
                  </NavLink>
                </li>
                {/* buyer submission */}
                <li>
                  <NavLink
                    to="/dashboard/taskToReview"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b] rounded px-3 py-2 flex items-center"
                  >
                    <FaClipboardCheck className="inline-block mr-2" /> Task To
                    Review
                  </NavLink>
                </li>
              </>
            )}

            {/* --------admin links------- */}
            {!categoryLoading && category === "admin" && (
              <>
                {/* Manage Users */}
                <li>
                  <NavLink
                    to="/dashboard/manageUsers"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaUsers className="inline-block mr-2" /> Manage Users
                  </NavLink>
                </li>

                {/* Manage Tasks */}
                <li>
                  <NavLink
                    to="/dashboard/manageTasks"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaListAlt className="inline-block mr-2" /> Manage Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/withdrawRequests"
                    className="hover:bg-[#fca61b5d] hover:shadow-[0_0_20px_#fca61b]"
                  >
                    <FaMoneyCheckAlt className="inline-block mr-2" />Withdraw Requests
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
