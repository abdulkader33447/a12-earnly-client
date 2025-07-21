import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const BestWorkers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: workers = [], isLoading } = useQuery({
    queryKey: ["bestWorkers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/best-workers");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">
          BestWorkers
        </h1>
        <p className="text-center mb-15 text-gray-400 lg:w-[750px] mx-auto">
          Meet our top-performing workers! These outstanding individuals have
          earned the highest number of coins through their dedication,
          consistency, and excellent performance. We proudly showcase the top 6
          workers who are setting the standard for success in our community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {workers.map((worker) => (
            <div
              key={worker._id}
              className="bg-gradient-to-tl from-blue-50 to-yellow-50 p-4 rounded-xl hover:shadow-[_0_0_30px_#e9eaec] transition duration-500 text-center"
            >
              <img
                src={worker.photoURL}
                alt={worker.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover hover:shadow-[0_0_30px_#fca61b] transition duration-500"
              />
              <h2 className="text-xl font-semibold">{worker.displayName}</h2>
              <p className="mt-2 text-lg font-bold text-yellow-500">
                Coins: {worker.coins}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestWorkers;
