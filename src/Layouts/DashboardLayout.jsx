import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import {
  FaCheckCircle,
  FaCoins,
  FaHistory,
  FaHome,
  FaListAlt,
  FaPlus,
  FaTasks,
  FaUsers,
  FaWallet,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-5 ">
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
          <ul className="menu text-base-content min-h-full w-60 p-4 bg-gradient-to-t from-blue-100 via-green-100 to-blue-100 rounded-lg">
            <li>
              <NavLink
                to="/dashboard"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaHome className="inline-block mr-2" /> Home
              </NavLink>
            </li>

            {/*-------------- worker links --------------*/}
            <li>
              <NavLink
                to="/dashboard/tasks"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaTasks className="inline-block mr-2" /> Tasks
              </NavLink>
            </li>
            {/* My Submissions */}
            <li>
              <NavLink
                to="/dashboard/submissions"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaCheckCircle className="inline-block mr-2" /> My Submissions
              </NavLink>
            </li>

            {/* Withdrawals */}
            <li>
              <NavLink
                to="/dashboard/withdrawals"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaWallet className="inline-block mr-2" /> Withdrawals
              </NavLink>
            </li>

            {/*---------buyer links-------------  */}
            {/* Add New Tasks */}
            <li>
              <NavLink
                to="/dashboard/add-task"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaPlus className="inline-block mr-2" /> Add New Task
              </NavLink>
            </li>

            {/* My Tasks */}
            <li>
              <NavLink
                to="/dashboard/my-tasks"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaTasks className="inline-block mr-2" /> My Tasks
              </NavLink>
            </li>

            {/* Purchase Coin */}
            <li>
              <NavLink
                to="/dashboard/purchase-coin"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaCoins className="inline-block mr-2" /> Purchase Coin
              </NavLink>
            </li>

            {/* Payment History */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaHistory className="inline-block mr-2" /> Payment History
              </NavLink>
            </li>

            {/* --------admin links------- */}
            {/* Manage Users */}
            <li>
              <NavLink
                to="/dashboard/manage-users"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaUsers className="inline-block mr-2" /> Manage Users
              </NavLink>
            </li>

            {/* Manage Tasks */}
            <li>
              <NavLink
                to="/dashboard/manage-tasks"
                className="hover:bg-[#CAEB66] hover:shadow-[0_0_20px_#CAEB66]"
              >
                <FaListAlt className="inline-block mr-2" /> Manage Tasks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
