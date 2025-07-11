import React, { useState } from "react";
import lottieRegister from "../../../assets/lotties/lottieRegister.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log("form submitteddddd", data);
    createUser(data.email, data.password)
      // console.log("register form submitted", data);
      // console.log(createUser);
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signed Up successfully!",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(from);
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
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
          <h1 className="text-5xl font-bold">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">name is required</p>
              )}

              {/* category */}
              <label className="label">SignUp as a</label>
              <select
                {...register("category", { required: true })}
                className="p-[10px] border border-gray-300 rounded-sm"
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="Buyer">Buyer</option>
                <option value="Worker">Worker</option>
              </select>
              {errors.category?.type === "required" && (
                <p className="text-red-500">category required</p>
              )}

              {/* photo url */}
              <label className="label">PhotoURL</label>
              <input
                type="url"
                className="input w-full"
                placeholder="PhotoURL"
                {...register("photo", { required: true })}
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">photo url is required</p>
              )}

              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@gmail\.com$/,
                    message: "Only 'gmail' addresses are allowed",
                  },
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              {/* password */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Password must have at least 6 characters including uppercase, lowercase, and a number",
                    },
                  })}
                />
                <span onClick={()=>setShowPassword(!showPassword)} className="absolute top-[12px] right-3 cursor-pointer">{showPassword ? <FaEyeSlash className="size-4" /> : <FaEye className="size-4" />}</span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  password must be 6 characters or longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button className="btn bg-[#fca61b] hover:bg-[#f7a20a] border-none text-white mt-4">
                Register
              </button>
            </fieldset>
          </form>
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
