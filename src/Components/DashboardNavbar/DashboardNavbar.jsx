import useUserInfo from "../../Hooks/useUserInfo";
import { Link } from "react-router";
import logo from "../../assets/uh56knr8oel574nn6apb-removebg-preview.png";
import { FaBell, FaUser } from "react-icons/fa";
import LoadingSpinner from "../../Pages/LoadingSpinner/LoadingSpinner";

const DashboardNavbar = () => {

  const { userInfo, userInfoLoading } = useUserInfo();

  // console.log(userInfo.photoURL);

  if (userInfoLoading) {
    return <LoadingSpinner />;
  }
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
                {/* {links} */}
                {userInfo.category !== "admin" && (
                  <p>
                    Available coins :
                    <span className="text-blue-500 font-bold mx-2">
                      {userInfo.coins}
                    </span>
                  </p>
                )}
                <p>
                  User name :
                  <span className="font-bold mx-3">{userInfo.displayName}</span>
                </p>
                <p className="sm:hidden block">
                  Role :
                  <span className="mx-2 text-[#fca61b] font-bold ">
                    {userInfo.category}
                  </span>
                </p>
              </ul>
            </div>
            <Link to="/" className=" text-xl  ">
              <img src={logo} alt="logo" className="sm:size-13 size-11" />
            </Link>
          </div>
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {userInfo.category !== "admin" && (
                <p>
                  Available coins :
                  <span className="text-blue-500 font-bold mx-2">
                    {userInfo.coins}
                  </span>
                </p>
              )}
              <p>
                User name :
                <span className="font-bold mx-3">{userInfo.displayName}</span>
              </p>
            </ul>
          </div>
          <div className="navbar-end">
            <p className="sm:block hidden">
              Role :
              <span className="mx-2 text-[#fca61b] font-bold ">
                {userInfo.category}
              </span>
            </p>
            {userInfo?.photoURL ? (
              <img
                src={userInfo?.photoURL}
                alt="user photo"
                className="size-11 rounded-full"
              />
            ) : (
              <>
                <FaUser className="size-9 hover:text-[#fca61b]" />
              </>
            )}
            <FaBell className="size-6 mx-2 hover:text-[#fca61b]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
