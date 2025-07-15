import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { useState } from "react";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

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
              text: `Task deleted successfully. Refunded ${
                res.data.refill
              } coin${res.data.refill > 1 ? "s" : ""}.`,
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Faild to delete task.", error);
        }
      }
    });
  };
  return (
    <div>
      <h1 className="sm:text-3xl text-center font-bold my-5">MyTasks</h1>

      {/* modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md border border-gray-200 bg-gradient-to-tl from-blue-50 to-green-50">
            <h2 className="text-xl font-bold mb-4">Update Task</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const updatedData = {
                  title: e.target.title.value,
                  description: e.target.description.value,
                  submission_info: e.target.submission_info.value,
                };
                try {
                  const res = await axiosSecure.patch(
                    `/tasks/${selectedTask._id}`,
                    updatedData
                  );
                  if (res.data.modifiedCount > 0) {
                    Swal.fire(
                      "Updated!",
                      "Task updated successfully",
                      "success"
                    );
                    refetch();
                    setIsModalOpen(false);
                    setSelectedTask(null);
                  }
                } catch (error) {
                  Swal.fire("Error", "Failed to update task", "error");
                }
              }}
            >
              <input
                type="text"
                name="title"
                defaultValue={selectedTask.title}
                className="input input-bordered w-full mb-3 focus:outline-none"
                required
              />
              <textarea
                name="description"
                defaultValue={selectedTask.description}
                className="textarea textarea-bordered w-full mb-3 focus:outline-none"
                required
              ></textarea>
              <textarea
                name="submission_info"
                defaultValue={selectedTask.submission_info}
                className="textarea textarea-bordered w-full mb-3 focus:outline-none"
                required
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedTask(null);
                  }}
                  className="btn btn-outline hover:bg-red-500 hover:text-white text-red-500 hover:border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#1ebcecbe] hover:bg-[#1ebcec] border-none"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* task table */}
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
                    <button onClick={() => handleUpdate(task)}>
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
