import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

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

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tasks/${taskId}`);
          if (res.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch()
          }
        } catch (error) {
          Swal.fire("Error", "Faild to delete task.", error);
        }
      }
    });
  };
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
                      <FiEdit className="inline-block mr-2 cursor-pointer size-5 text-blue-600 hover:size-6" />
                    </button>
                    <button onClick={() => handleDelete(task._id)}>
                      <MdDeleteOutline className="inline-block mr-2 text-red-600 size-6 cursor-pointer hover:size-7" />
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
