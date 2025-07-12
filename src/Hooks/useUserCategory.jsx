import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserCategory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: category = "user",
    isLoading: categoryLoading,
    isError,
  } = useQuery({
    queryKey: user?.email ? ["userCategory", user?.email] : [],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/users?email=${user.email}`
      );
      return res?.data?.category || "user";
    },
  });
  return { category, categoryLoading, isError };
};

export default useUserCategory;
