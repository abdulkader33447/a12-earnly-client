import React from "react";
import lottieRegister from "../../../assets/lotties/lottieRegister.json";
import Lottie from "lottie-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-300px)] lg:w-8/12 md:w-9/12 w-11/12 mx-auto flex flex-col lg:flex-row-reverse py-10 items-center justify-center gap-5">
      {/* lottie */}
      <div>
        <Lottie
          animationData={lottieRegister}
          loop={true}
          style={{ width: "300px" }}
        />
      </div>

      {/* form */}

      <motion.div initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                scale: { type: "spring", visualDuration: 0.7, bounce: 0 },
              }} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl font-bold">Register</h1>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p>
            Already have an account? go to{" "}
            <Link className="text-blue-600 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
