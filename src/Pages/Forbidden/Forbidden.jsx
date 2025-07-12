import React from "react";
import { FaBan } from "react-icons/fa";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-[0_0_5px_#fca61b42] max-w-md w-full">
        <FaBan className="text-red-500 text-6xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="btn bg-[#fca61b] text-white hover:shadow-[0_0_20px_#fca61b42] border-none"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
