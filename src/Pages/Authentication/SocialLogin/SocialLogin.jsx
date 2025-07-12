import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/dashboard";

  const [user, setUser] = useState(null);
  const [category, setCategory] = useState("");

  const handleGoogleLogIn = () => {
    googleLogin()
      .then(async (result) => {
        const loggedUser = result.user;

        // ✅ Check user exists or not
        try {
          const res = await axiosSecure.get(`/users/check/${loggedUser.email}`);
          const exists = res.data.exists;

          if (!exists) {
            // new user → category select modal
            setUser(loggedUser);
            document.getElementById("category_modal").showModal();
          } else {
            // already exist → go

            await axiosSecure.post("/users", {
              name: loggedUser.displayName,
              email: loggedUser.email,
              photo: loggedUser.photoURL,
              category: "",
              createdAt: new Date().toLocaleString(),
              lastLogin: new Date().toLocaleString(),
            });

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Welcome back!",
              showConfirmButton: false,
              timer: 2000,
            });
            navigate(from);
          }
        } catch (error) {
          console.error("User check failed:", error);
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  const handleCategorySubmit = async () => {
    if (!category) {
      return Swal.fire("Please select a category");
    }

    const userInfo = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      category: category,
      createdAt: new Date().toLocaleString(),
      lastLogin: new Date().toLocaleString(),
    };

    try {
      await axiosSecure.post("/users", userInfo);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Signed Up successfully!",
        showConfirmButton: false,
        timer: 3000,
      });
      document.getElementById("category_modal").close();

      navigate(from);
    } catch (err) {
      console.error("POST /users error:", err);
    }
  };

  return (
    <div>
      <p className="text-center my-2">OR</p>

      <button
        onClick={handleGoogleLogIn}
        className="btn w-full bg-white border-[#e5e5e5] hover:bg-[#fca61b] hover:text-white"
      >
        Login with Google
      </button>

      {/* Modal */}
      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select your category</h3>
          <div className="mt-4 space-y-2">
            <label>
              <input
                type="radio"
                name="category"
                value="buyer"
                onChange={(e) => setCategory(e.target.value)}
              />{" "}
              Buyer
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="category"
                value="worker"
                onChange={(e) => setCategory(e.target.value)}
              />{" "}
              Worker
            </label>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={handleCategorySubmit}>
              Submit
            </button>
            <form method="dialog">
              <button className="btn btn-outline">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SocialLogin;
