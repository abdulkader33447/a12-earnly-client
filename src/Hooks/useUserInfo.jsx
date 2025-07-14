import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo = {},
    isLoading: userInfoLoading,
    isError,
  } = useQuery({
    queryKey: user?.email ? ["userInfo", user?.email] : [],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  return { userInfo, userInfoLoading, isError };
};

export default useUserInfo;
