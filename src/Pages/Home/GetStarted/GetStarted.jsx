import React from "react";
import { Link } from "react-router";

const GetStarted = () => {
  return (
    <div>
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">Get Started</h1>
         <p className="text-xl mb-6 text-center">“Ready to start earning?”</p>
         <div className="text-center flex sm:flex-row flex-col items-center justify-center gap-5">
          <Link to="/register" className="btn btn-outline text-[#fca61b] hover:shadow-[_0_0_10px_#fca61b] hover:bg-[#fca61b] hover:text-white hover:border-none transition duration-700">Join as worker</Link>
          <Link to="/register" className="btn btn-outline text-[#fca61b] hover:shadow-[_0_0_10px_#fca61b] hover:bg-[#fca61b] hover:text-white hover:border-none transition duration-700">Join as Buyer</Link>
         </div>
      </div>
    </div>
  );
};

export default GetStarted;
