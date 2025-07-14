import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTasks", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }
  // console.log(tasks);
  return (
    <div>
      <h1>MyTasks</h1>
      {tasks.length === 0 ? (
        <p>to task yet</p>
      ) : (
        <div className="overflow-x-auto bg-gradient-to-bl from-blue-100 to-green-100 rounded-xl">
          <table className="table w-full">
            <thead className="bg-gray-200">
              <tr className="">
                <th>#</th>
                <th>Title</th>
                <th>Submission Deatail</th>
                <th>Completion Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.submission_info}</td>
                  <td>{task.completion_date}</td>
                  <td className="space-x-2">
                    <button>
                      <FiEdit className="inline-block mr-2 cursor-pointer size-5 text-blue-600" />
                    </button>
                    <button>
                      <MdDeleteOutline className="inline-block mr-2 text-red-600 size-6 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
