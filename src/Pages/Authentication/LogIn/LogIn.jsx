import React, { useState } from "react";
import lottieLog from "../../../assets/lotties/lottiLogin.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const LogIn = () => {
  const { logIn } = useAuth();
  const [logInError, setLogInError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  // const onSubmit =async (data) => {
  //   // console.log("log form submitted");
  //   logIn(data.email, data.password)
  //     .then((result) => {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Sign in successfully!",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //       const userInfo = {
  //         email: result.user.email,
  //         lastLogin: new Date().toLocaleString(),
  //       };
  //       await axiosSecure.patch(`/users/lastLogin?email=${userInfo.email}`, {
  //         lastLogin: userInfo.lastLogin,
  //       });

  //       navigate(from);
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setLogInError("incorrect email or password");
  //     });
  // };

  const onSubmit = async (data) => {
    try {
      const result = await logIn(data.email, data.password);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sign in successfully!",
        showConfirmButton: false,
        timer: 3000,
      });

      const userInfo = {
        email: result.user.email,
        lastLogin: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      await axiosSecure.patch(`/users/lastLogin?email=${userInfo.email}`, {
        lastLogin: userInfo.lastLogin,
      });

      navigate(from);
      // console.log(result);
    } catch (error) {
      console.error(error);
      setLogInError("incorrect email or password");
    }
  };

  return (
    <div className="">
      <div className="min-h-[calc(100vh-300px)] lg:w-8/12 md:w-9/12 w-11/12 mx-auto flex flex-col lg:flex-row-reverse py-10 items-center justify-center gap-5">
        {/* lottie */}
        <div className="">
          <Lottie
            animationData={lottieLog}
            loop={true}
            style={{ width: "300px" }}
          />
        </div>

        {/* form */}
        <div className="">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              scale: { type: "spring", visualDuration: 0.7, bounce: 0 },
            }}
            className="card bg-base-100 w-full max-w-sm shrink-0 shadow-[_0_0_20px_#fca61b42]"
          >
            <div className="card-body">
              <h1 className="text-5xl font-bold">log in</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">email is required</p>
                  )}

                  {/* password */}
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input w-full"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-[12px] right-3 cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="size-4" />
                      ) : (
                        <FaEye className="size-4" />
                      )}
                    </span>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">password is required</p>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn shadow-none bg-[#fca61b] hover:bg-[#f7a20a] text-white mt-4">
                    Login
                  </button>
                  <p className="text-red-500">{logInError}</p>
                </fieldset>
              </form>
              <SocialLogin />
              <p>
                Don't have an account? go to{" "}
                <Link className="text-blue-600 underline" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
