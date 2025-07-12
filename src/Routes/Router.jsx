import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Authentication/LogIn/LogIn";
import Register from "../Pages/Authentication/Register/Register";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Context/PriveteRoutes/PrivateRoute";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddNewTask from "../Pages/Dashboard/AddNewTask/AddNewTask";
import Forbidden from "../Pages/Forbidden/Forbidden";
import BuyerRoute from "../Context/PriveteRoutes/BuyerRoute";
import MyTasks from "../Pages/Dashboard/MyTasks/MyTasks";
import PurchaseCoin from "../Pages/Dashboard/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import WorkerRoute from "../Context/PriveteRoutes/WorkerRoute";
import TaskList from "../Pages/Dashboard/TaskList/TaskList";
import MySubmissions from "../Pages/Dashboard/MySubmissions/MySubmissions";
import Withdrawals from "../Pages/Dashboard/Withdrawals/Withdrawals";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageTask from "../Pages/Dashboard/ManageTask/ManageTask";
import AdminRoute from "../Context/PriveteRoutes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      // -----buyer rote-----
      {
        path: "addNewTask",
        element: (
          <BuyerRoute>
            <AddNewTask />
          </BuyerRoute>
        ),
      },
      {
        path: "myTasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "purchaseCoin",
        element: (
          <BuyerRoute>
            <PurchaseCoin />
          </BuyerRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      // -----buyer routes-----

      // ------worker routes-----
      {
        path: "taskList",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "mySubmissions",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <Withdrawals />
          </WorkerRoute>
        ),
      },
      // ------worker routes-----

      // -----admin routes----
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manageTasks",
        element: (
          <AdminRoute>
            <ManageTask />
          </AdminRoute>
        ),
      },
      // -----admin routes----
    ],
  },
]);
