import React from "react";
import logo from "../../assets/uh56knr8oel574nn6apb-removebg-preview.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      ) : (
        <>
          {/* <li>
            <NavLink to="/login">Login</NavLink>
          </li> */}
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <a
          href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-abdulkader33447"
          target="_blank"
        >
          Join as Developer
        </a>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "sign out user",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="">
      <div className="navbar bg-base-100 navbar-sticky shadow-sm  px-0">
        <div className="navbar lg:w-8/12 md:w-10/12 w-11/12 mx-auto  px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="mr-2 lg:hidden cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link to="/" className=" text-xl  ">
              <img src={logo} alt="logo" className="sm:size-13 size-11" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <Link>
                  {user.photoURL ? (
                    <span
                      className="tooltip tooltip-bottom"
                      data-tip={user?.displayName}
                    >
                      <img
                        src={user.photoURL}
                        alt="user photo"
                        className="size-11 rounded-full"
                      />
                    </span>
                  ) : (
                    <>
                      <FaUser className="size-9 hover:text-[#fca61b]"/>
                    </>
                  )}
                </Link>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 z-[1] rounded-box w-30 p-2"
                >
                  <li>
                    <Link
                      onClick={handleLogOut}
                      className="btn shadow-none hover:bg-[#fca61b] hover:text-white"
                    >
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn shadow-none bg-[#fca61b] text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
