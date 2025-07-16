import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;

// import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//   baseURL: `http://localhost:5000`, 
// });

// const useAxiosSecure = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const requestInterceptor = axiosSecure.interceptors.request.use(
//       (config) => {
//         const token = user?.accessToken || localStorage.getItem("access-token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseInterceptor = axiosSecure.interceptors.response.use(
//       (res) => res,
//       (error) => {
//         const status = error?.response?.status;
//         if (status === 401) {
//           logOut().then(() => {
//             navigate("/login");
//           });
//         } else if (status === 403) {
//           navigate("/forbidden");
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup
//     return () => {
//       axiosSecure.interceptors.request.eject(requestInterceptor);
//       axiosSecure.interceptors.response.eject(responseInterceptor);
//     };
//   }, [user, logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
