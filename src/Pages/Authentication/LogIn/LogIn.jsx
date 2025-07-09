import React from "react";
import lottieLog from "../../../assets/lotties/lottiLogin.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LogIn = () => {
  const { logIn } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log("log form submitted");
    logIn(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Sign in successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(from);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
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
            className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
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
                  <input
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">password is required</p>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn shadow-none bg-[#fca61b] hover:bg-[#f7a20a] text-white mt-4">
                    Login
                  </button>
                  {/* Google */}
                  <button className="btn shadow-none hover:bg-[#fca61b] hover:text-white bg-white border-[#e5e5e5]">
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="rounded-full"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                </fieldset>
              </form>
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
